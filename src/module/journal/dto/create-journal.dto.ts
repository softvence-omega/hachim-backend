import {
  IsInt,
  Min,
  Max,
  IsString,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJournalDto {
  @ApiProperty({
    example: 'Had a stressful day but resisted urges.',
    description: 'Journal note describing user experience',
  })
  @IsNotEmpty({ message: 'Note cannot be empty' })
  @IsString({ message: 'Note must be a string' })
  note: string;

  @ApiProperty({
    example: '2025-06-25',
    description: 'Date of the journal entry in ISO8601 format',
  })
  @IsNotEmpty({ message: 'Date is required' })
  @IsISO8601({}, { message: 'Date must be in ISO8601 format' })
  date: string;

  @ApiProperty({
    example: 7,
    description: 'Mood rating from 0 (worst) to 10 (best)',
    minimum: 0,
    maximum: 10,
  })
  @IsNotEmpty({ message: 'Mood rating is required' })
  @IsInt({ message: 'Mood must be an integer' })
  @Min(0, { message: 'Mood must be at least 0' })
  @Max(10, { message: 'Mood cannot exceed 10' })
  mode: number;

  @ApiProperty({
    example: 3,
    description: 'Urge rating from 0 (none) to 10 (strongest)',
    minimum: 0,
    maximum: 10,
  })
  @IsNotEmpty({ message: 'Urge rating is required' })
  @IsInt({ message: 'Urge must be an integer' })
  @Min(0, { message: 'Urge must be at least 0' })
  @Max(10, { message: 'Urge cannot exceed 10' })
  urge: number;
}
