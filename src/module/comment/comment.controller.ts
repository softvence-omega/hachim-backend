import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body() data: { content: string; postId: string; userId: string },
    @Res() res: Response,
  ) {
    const result = await this.commentService.createComment(data);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Comment created successfully',
      data: result,
    });
  }

  @Get(':postId')
  async getCommentsByPost(
    @Param('postId') postId: string,
    @Res() res: Response,
  ) {
    const result = await this.commentService.getCommentsByPost(postId);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Comments retrieved successfully',
      data: result,
    });
  }
}
