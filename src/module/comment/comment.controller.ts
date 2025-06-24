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
import { CreateCommentDto } from './dto/comment.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body() data:CreateCommentDto,
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

  // @Get(':postId')
  // async getCommentsByPost(
  //   @Param('postId') postId: string,
  //   @Res() res: Response,
  // ) {
  //   const result = await this.commentService.getCommentsByPost(postId);

  //   return sendResponse(res, {
  //     statusCode: HttpStatus.OK,
  //     success: true,
  //     message: 'Comments retrieved successfully',
  //     data: result,
  //   });
  // }

  @Get(':postId')
  @ApiParam({
  name: 'postId',
  type: String,
  description: 'ID of the post to retrieve comments for',
  example: 'b1234a56-78cd-90ef-1234-567890abcdef',
})
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
  async getAllComments( @Res() res: Response) {
  
    const data = await this.commentService.getAllComments();

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Comments retrieved successfully',
      data,
    });
  }
}
