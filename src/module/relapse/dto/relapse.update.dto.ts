import { IsString, IsDateString, IsInt, IsBoolean, IsOptional } from 'class-validator';



export class UpdateRelapseDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

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
  spendDate?: Date;

  @IsOptional()
  @IsInt()
  level?: number;
}
