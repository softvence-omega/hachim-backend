import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeCommentDto {
  @ApiProperty({
    description: 'ID of the comment to like/unlike',
    example: 'b1234a56-78cd-90ef-1234-567890abcdef',
  })
  @IsString({ message: 'commentId must be a string' })
  @IsNotEmpty({ message: 'commentId is required' })
  commentId: string;
}
