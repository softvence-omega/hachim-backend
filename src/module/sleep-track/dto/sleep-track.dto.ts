// src/modules/sleep-track/dto/create-sleep.dto.ts
import { IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSleepDto {
  @ApiProperty({
    example: 99,
    description: 'Number of hours slept (between 0 and 24)',
    minimum: 0,
    maximum: 100,
  })
  @IsInt({ message: 'Hours must be an integer' })
  @Min(0, { message: 'Hours cannot be less than 0' })
  @Max(100, { message: 'Hours cannot be more than 24' })
  hours: number;
}
