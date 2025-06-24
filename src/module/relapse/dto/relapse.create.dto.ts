// src/modules/relapse/dto/relapse.create.dto.ts

import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsBoolean,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateRelapseDto {
  @ApiPropertyOptional({
    example: 5,
    description: 'Mood rating (integer)',
  })
  @IsOptional()
  @IsInt({ message: 'Mood must be an integer' })
  Mood?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Urge rating (integer)',
  })
  @IsOptional()
  @IsInt({ message: 'Urg must be an integer' })
  urg?: number;

  @ApiPropertyOptional({
    example: 'Stress, social pressure',
    description: 'Triggers that caused the relapse',
  })
  @IsOptional()
  @IsString({ message: 'Triggers must be a string' })
  Triggers?: string;

  @ApiPropertyOptional({
    example: 'Felt overwhelmed after work',
    description: 'Additional notes about the relapse',
  })
  @IsOptional()
  @IsString({ message: 'Note must be a string' })
  note?: string;

  @ApiPropertyOptional({
    example: '2025-06-25T10:00:00Z',
    description: 'Date when the relapse happened (ISO 8601 format)',
  })
  @IsOptional()
  @IsDateString({}, { message: 'spendDate must be a valid ISO8601 date string' })
  spendDate?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Relapse severity level',
  })
  @IsOptional()
  @IsInt({ message: 'Level must be an integer' })
  level?: number;

  @ApiProperty({
    example: '2025-06-25T08:00:00Z',
    description: 'Start date/time of the relapse event',
  })
  @IsDate({ message: 'startDate must be a valid Date object' })
  @Type(() => Date)
  startDate: Date;

  @ApiPropertyOptional({
    example: false,
    description: 'Flag indicating if the relapse record is deleted',
  })
  @IsOptional()
  @IsBoolean({ message: 'isDeleted must be a boolean' })
  isDeleted?: boolean;
}
