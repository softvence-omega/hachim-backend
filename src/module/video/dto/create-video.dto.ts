import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsOptional()
  videoUrl?: string;
}
