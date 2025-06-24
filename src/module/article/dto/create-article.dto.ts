import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: '10 Practical Steps to Overcome Porn Addiction',
    description: 'A clear and motivating title for an article that helps users break free from porn addiction',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This article outlines actionable strategies such as accountability, habit replacement, and digital detox to help users overcome pornography addiction.',
    description: 'A short summary of what the article covers, especially focused on recovery, mental health, and support',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
