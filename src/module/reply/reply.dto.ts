// src/modules/reply/dto/create-reply.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyDto {
  @ApiProperty({
    example: 'Thanks for your comment!',
    description: 'Content of the reply',
  })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @ApiProperty({
    example: 'b1234a56-78cd-90ef-1234-567890abcdef',
    description: 'ID of the comment this reply belongs to',
  })
  @IsString({ message: 'commentId must be a string' })
  @IsNotEmpty({ message: 'commentId is required' })
  commentId: string;
}
