import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  async createReply(
    @Body() data: { content: string; commentId: string },
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.replyService.createReply(data, req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Reply created successfully',
      data: result,
    });
  }

  @Get('comment/:commentId')
  async getRepliesByComment(
    @Param('commentId') commentId: string,
    @Res() res: Response,
  ) {
    const result = await this.replyService.getRepliesByComment(commentId);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Replies fetched successfully',
      data: result,
    });
  }
}
