import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 49.99,
    description: 'Subscription amount in USD or relevant currency',
  })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount must be at least 0' })
  amount: number;

  @ApiProperty({
    example: 30,
    description: 'Duration of the subscription in days',
  })
  @IsNumber({}, { message: 'DurationDays must be a number' })
  @Min(1, { message: 'DurationDays must be at least 1 day' })
  durationDays: number;
}
