// src/modules/relapse/dto/relapse.create.dto.ts

import { IsString, IsOptional, IsInt, IsDateString, IsBoolean } from 'class-validator';

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

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean; 
}
