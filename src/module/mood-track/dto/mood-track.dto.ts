// src/modules/mood-track/dto/create-mood.dto.ts
import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMoodDto {
  @ApiProperty({
    example: 7,
    description: 'Mood value, typically from 0 to 10',
    minimum: 0,
    maximum: 10,
  })
  @IsInt({ message: 'Value must be an integer' })
  @Min(0, { message: 'Value must be at least 0' })
  @Max(10, { message: 'Value must be at most 10' })
  value: number;

  
}
