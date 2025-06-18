import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRecoveryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'streakDays must be an integer' })
  @Min(0, { message: 'streakDays must be at least 0' })
  streakDays?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'sleepScore must be between 0 and 100' })
  @Max(100, { message: 'sleepScore must be between 0 and 100' })
  sleepScore?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'moodScore must be between 0 and 100' })
  @Max(100, { message: 'moodScore must be between 0 and 100' })
  moodScore?: number;
}