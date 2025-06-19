// src/modules/relapse/dto/relapse.create.dto.ts

import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateRelapseDto {
  @IsOptional()
  @IsInt()
  Mood?: number;

  @IsOptional()
  @IsInt()
  urg?: number;

  @IsOptional()
  @IsString()
  Triggers?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsDateString()
  spendDate?: string;

  @IsOptional()
  @IsInt()
  level?: number;

  @IsDate()
  @Type(() => Date) // 👈 This line ensures the plain string is transformed into a Date object
  startDate: Date;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
