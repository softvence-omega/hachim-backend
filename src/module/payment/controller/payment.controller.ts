// src/modules/payment/payment.controller.ts

import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Headers,
  RawBodyRequest,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from '../dto/payment.dto';
import Stripe from 'stripe';
import sendResponse from 'src/module/utils/sendResponse';
import { PaymentService } from '../services/payment.services';


@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

 @Post('/')
  async create(@Body() dto: CreatePaymentDto, @Res() res: Response) {
    const data = await this.paymentService.createPayment(dto,"");
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Payment created successfully',
      data,
    });
  }
  
  @Post('/webhook')
  async webhook(@Headers('stripe-signature') signature: string, @Req() req: RawBodyRequest<Request>) {
    return this.paymentService.handleWebhook(req);
  }



  
  

  
  
}
