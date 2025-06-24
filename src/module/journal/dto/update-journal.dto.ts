import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateJournalDto {
  @ApiPropertyOptional({
    example: 'Felt more focused today.',
    description: 'Updated journal note',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Note cannot be empty if provided' })
  @IsString({ message: 'Note must be a string' })
  note?: string;

  @ApiPropertyOptional({
    example: '2025-06-25',
    description: 'Updated date in ISO8601 format',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Date cannot be empty if provided' })
  @IsISO8601({}, { message: 'Date must be in ISO8601 format' })
  date?: string;

  @ApiPropertyOptional({
    example: 8,
    description: 'Updated mood rating (0 to 10)',
    minimum: 0,
    maximum: 10,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Mood cannot be empty if provided' })
  @IsInt({ message: 'Mood must be an integer' })
  @Min(0, { message: 'Mood must be at least 0' })
  @Max(10, { message: 'Mood cannot exceed 10' })
  mode?: number;

  @ApiPropertyOptional({
    example: 4,
    description: 'Updated urge rating (0 to 10)',
    minimum: 0,
    maximum: 10,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Urge cannot be empty if provided' })
  @IsInt({ message: 'Urge must be an integer' })
  @Min(0, { message: 'Urge must be at least 0' })
  @Max(10, { message: 'Urge cannot exceed 10' })
  urge?: number;
}
