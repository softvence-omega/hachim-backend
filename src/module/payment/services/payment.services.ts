// src/modules/payment/payment.service.ts

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  RawBodyRequest,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import Stripe from 'stripe';

import { Request } from 'express';
import { CreatePaymentDto } from '../dto/payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }

  async createPayment(dto: CreatePaymentDto) {
    const {durationDays, amount ,email } = dto;

  
    const isPayment = await this.prisma.payment.findFirst({
      where: { email,subscription:true },
    })

    if(isPayment){
      throw new BadRequestException('You have already subscribed');
    }


    
    

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Instant Payment',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.CLIENT_URL_SUCCESSFUL,
      cancel_url: process.env.CLIENT_URL_CANCEL,
      payment_intent_data: {
        metadata: {
          email,
          durationDays
        },
      },
    });

    if (!session?.url)
      throw new BadRequestException('Stripe session creation failed');
    console.log('send url');
    return { url: session.url };
  }

  async handleWebhook(req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    const rawBody = req.rawBody;

    if (!rawBody) {
      throw new BadRequestException('No webhook payload was provided.');
    }
    console.log('before stripe checked');
    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch {
      throw new BadRequestException('Invalid Stripe signature');
    }

    const data = event.data.object as Stripe.PaymentIntent;
    const metadata = data.metadata;
    console.log(metadata, 'not success but hite');
    console.log(event.type);

    if (event.type === 'payment_intent.succeeded') {
      console.log('successful');
      const transactionId = data.id;
      const amount = data.amount_received / 100;
      const email = metadata.email;

      this.logger.warn('');

      try {
        await this.prisma.payment.create({
          data: {
            transactionId,
            amount,
            durationDays: parseInt(metadata.durationDays),
            email
            
          },
        });

        
      } catch (error) {
        console.error('Error saving payment:', error);
        throw new BadRequestException('Failed to save payment');
      }
    }

    if (event.type === 'payment_intent.payment_failed') {
    }

    return { received: true, type: event.type };
  }


 async getAllPayments(query: { page?: number; limit?: number; amount?: string }) {
  const { page = 1, limit = 10, amount } = query;

  const skip = (page - 1) * limit;
  const take = limit;

  const whereClause = amount
    ? {
        amount: {
          equals: parseFloat(amount), 
        },
      }
    : {};

  const [payments, total] = await this.prisma.$transaction([
    this.prisma.payment.findMany({
      where: whereClause,
      include: {
        user: true,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    this.prisma.payment.count({ where: whereClause }),
  ]);

  return {
    statusCode: 200,
    success: true,
    message: 'Payments fetched successfully',
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: payments,
  };
}



}
