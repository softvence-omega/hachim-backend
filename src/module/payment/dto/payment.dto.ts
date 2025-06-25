// src/modules/payment/payment.dto.ts
import { IsEmail, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    example: 100.5,
    description: 'Amount to be paid',
  })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount must be at least 0' })
  amount: number;

  @ApiProperty({
    example: 30,
    description: 'Duration in days for the payment or subscription',
  })
  @IsNumber({}, { message: 'Duration must be a number' })
  @Min(1, { message: 'Duration must be at least 1 day' })
  durationDays: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address associated with the payment',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;
}

export class CheckPaymentQueryDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address associated with the payment',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;
}