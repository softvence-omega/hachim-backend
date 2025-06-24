import { IsOptional, IsNumber, IsBoolean, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubscriptionDto {
  @ApiPropertyOptional({
    example: 59.99,
    description: 'Updated subscription amount',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount must be at least 0' })
  amount?: number;

  @ApiPropertyOptional({
    example: 60,
    description: 'Updated duration of subscription in days',
  })
  @IsOptional()
  @IsNumber({}, { message: 'DurationDays must be a number' })
  @Min(1, { message: 'DurationDays must be at least 1 day' })
  durationDays?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the subscription is active or not',
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;
}
