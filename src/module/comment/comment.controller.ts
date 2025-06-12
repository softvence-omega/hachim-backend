import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(
    @Body() data: { content: string; postId: string; userId: string },
  ) {
    return this.commentService.createComment(data);
  }

  @Get(':postId')
  getCommentsByPost(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPost(postId);
  }
}
