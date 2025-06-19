import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';

export class CreateJournalDto {
  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsISO8601()
  date: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  mode: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  urge: number;
}
