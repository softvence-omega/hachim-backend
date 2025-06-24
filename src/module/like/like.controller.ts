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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LikeCommentDto } from './dto/create.dto';



@ApiTags('Likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @ApiOperation({ summary: 'Like a comment' })
  @ApiBody({ type: LikeCommentDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment liked successfully',
  })
  async likeComment(
    @Body() data: LikeCommentDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.likeService.likeComment(data, req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Comment liked successfully',
      data: result,
    });
  }

  @Delete()
  @ApiOperation({ summary: 'Unlike a comment' })
  @ApiBody({ type: LikeCommentDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment unliked successfully',
  })
  async unlikeComment(
    @Body() data: LikeCommentDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.likeService.unlikeComment(data, req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Comment unliked successfully',
      data: result,
    });
  }
}
