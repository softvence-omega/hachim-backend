import { IsOptional, IsString } from 'class-validator';

export class CreateAnimationImageDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
