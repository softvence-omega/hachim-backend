// src/modules/payment/payment.service.ts

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  RawBodyRequest,
  NotFoundException,
} from '@nestjs/common';
import Stripe from 'stripe';

import { Request } from 'express';
import { CreatePaymentDto } from '../dto/payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
   
    private prisma: PrismaService,
    

  ) {
    this.stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY as string
    );
  }

  async createPayment(dto: CreatePaymentDto, userId:string) {


    const {amount } = dto;

   console.log(userId)
   const user = await this.prisma.user.findUnique({
    where: {id: userId},
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }
    
     

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Instant Payment',
            },
            unit_amount: amount* 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.CLIENT_URL_SUCCESSFUL,
      cancel_url: process.env.CLIENT_URL_CANCEL,
      payment_intent_data: {
        metadata: {
           userId
        },
      },
    });

    if (!session?.url)
      throw new BadRequestException('Stripe session creation failed');
    return { url: session.url };
  }

  async handleWebhook(req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    const rawBody = req.rawBody;

    if (!rawBody) {
      throw new BadRequestException('No webhook payload was provided.');
    }
    
    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string

      );
    } catch {
      throw new BadRequestException('Invalid Stripe signature');
    }

    const data = event.data.object as Stripe.PaymentIntent;
    const metadata = data.metadata;
    console.log(data)
     if (event.type === 'payment_intent.succeeded') {
      const transactionId = data.id;
      const amount = data.amount_received / 100; 
      const userId = metadata.userId; 

      try {
        await this.prisma.payment.create({
          data: {
            transactionId,
            amount,
            user: {
              connect: { id: userId },
            },
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

}
