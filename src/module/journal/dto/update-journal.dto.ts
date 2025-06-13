import { IsInt, Min, Max, IsOptional, IsString, IsISO8601, IsNotEmpty } from 'class-validator';

export class UpdateJournalDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  note: string;

   @IsOptional()
 @IsNotEmpty()
  @IsISO8601()
  date: string;

   @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  mode: number;

 @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  urge: number;
}
