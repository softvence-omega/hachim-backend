// src/modules/motivation-track/dto/create-motivation.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMotivationDto {
  @ApiProperty({
    example: 'Keep pushing forward!',
    description: 'Motivational message content',
  })
  @IsString({ message: 'Motivation must be a string' })
  @IsNotEmpty({ message: 'Motivation is required' })
  motivation: string;
}
