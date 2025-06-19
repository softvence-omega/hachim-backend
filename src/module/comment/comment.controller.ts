import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body() data: { content: string },
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.commentService.createComment(data, req.user.sub);

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

  @Get()
  async getAllComments(@Query('limit') limit: string, @Res() res: Response) {
    const parsedLimit = parseInt(limit, 10) || 10;
    const data = await this.commentService.getAllComments(parsedLimit);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Comments retrieved successfully',
      data,
    });
  }
}
