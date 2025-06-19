import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  quote: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
