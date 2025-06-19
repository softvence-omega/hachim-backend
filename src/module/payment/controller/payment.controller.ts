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
import { Public } from 'src/common/decorators/public.decorators';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/')
  async create(
    @Body() dto: CreatePaymentDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const data = await this.paymentService.createPayment(dto, req.user.sub);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Payment created successfully',
      data,
    });
  }
  @Public()
  @Post('/webhook')
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    return this.paymentService.handleWebhook(req);
  }

  @Get()
  async getAllPayments(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('amount') amount?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;


  @Get()
  async getAllPayments(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('amount') amount?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;


    return this.paymentService.getAllPayments({
      page: pageNumber,
      limit: limitNumber,
      amount,
    });
  }
  
  

  
  

}
