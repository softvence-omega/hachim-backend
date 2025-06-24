import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({
    example: 'Understanding NestJS Validation',
    description: 'Title of the video',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiPropertyOptional({
    example: 'https://example.com/video.mp4',
    description: 'Optional URL of the video',
  })
  @IsOptional()
  @IsUrl({}, { message: 'videoUrl must be a valid URL' })
  videoUrl?: string;
}
