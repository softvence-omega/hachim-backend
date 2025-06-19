// src/modules/payment/payment.dto.ts

import { IsEmail, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  durationDays: number;

  @IsEmail()
  email: string;
}
