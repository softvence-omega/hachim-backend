import { IsString, IsDateString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateRelapseDto {
  @IsDateString()
  startTime: Date;

  @IsInt()
  Mood: number;

  @IsInt()
  urg: number;

  @IsString()
  Triggers: string;

  @IsString()
  note: string;

  @IsDateString()
  spendDate: Date;

  @IsInt()
  level: number;

  @IsString()
  userId: string;
}

