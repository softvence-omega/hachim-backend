// src/modules/payment/payment.controller.ts

import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Headers,
  RawBodyRequest,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {  CheckPaymentQueryDto, CreatePaymentDto } from '../dto/payment.dto';
import sendResponse from 'src/module/utils/sendResponse';
import { PaymentService } from '../services/payment.services';
import { Public } from 'src/common/decorators/public.decorators';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Public()
  @Post('/')
  async create(
    @Body() dto: CreatePaymentDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const data = await this.paymentService.createPayment(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Payment created successfully',
      data,
    });
  }
  
  
 @Public()
@Get('/check-payment')
@ApiTags('Payment')
@ApiOperation({ summary: 'Check if user has completed payment' })
@ApiQuery({
  name: 'email',
  required: true,
  description: 'Email address associated with the payment',
  example: 'user@example.com',
})
@ApiResponse({
  status: 200,
  description: 'Payment check completed successfully',
})
async isUserCompletedPayment(
  @Query('email') email: string,
  @Res() res: Response,
  @Req() req: Request,
) {
  const data = await this.paymentService.checkPayment({ email });
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Payment check completed successfully',
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
  @Roles(Role.ADMIN)
  async getAllPayments(
    @Query('amount') amount?: string,
  ) {
    return this.paymentService.getAllPayments({
      amount,
    });
  }
  
  

  
  

}
