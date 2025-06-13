import {
  Controller,
  Post,
  Body,
  Delete,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';


@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async likeComment(
    @Body() data: { commentId: string; },
    @Res() res: Response,
    @Req() req
  ) {
    const result = await this.likeService.likeComment(data,req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Comment liked successfully',
      data: result,
    });
  }

  @Delete()
  async unlikeComment(
    @Body() data: { commentId: string; },
    @Res() res: Response,
    @Req() req
  ) {
    const result = await this.likeService.unlikeComment(data,req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Comment unliked successfully',
      data: result,
    });
  }
}
