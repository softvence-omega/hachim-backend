import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRecoveryDto {
  @ApiPropertyOptional({
    example: 15,
    description: 'Number of streak days (integer, at least 0)',
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'streakDays must be an integer' })
  @Min(0, { message: 'streakDays must be at least 0' })
  streakDays?: number;

  @ApiPropertyOptional({
    example: 85,
    description: 'Sleep score (0 to 100)',
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'sleepScore must be between 0 and 100' })
  @Max(100, { message: 'sleepScore must be between 0 and 100' })
  sleepScore?: number;

  @ApiPropertyOptional({
    example: 70,
    description: 'Mood score (0 to 100)',
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'moodScore must be between 0 and 100' })
  @Max(100, { message: 'moodScore must be between 0 and 100' })
  moodScore?: number;
}
