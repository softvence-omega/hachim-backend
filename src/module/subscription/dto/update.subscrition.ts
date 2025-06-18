import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  durationDays?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
