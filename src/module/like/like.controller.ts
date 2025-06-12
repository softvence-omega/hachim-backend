import { Controller, Post, Body, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async likeComment(@Body() data: { commentId: string; userId: string }) {
    return this.likeService.likeComment(data);
  }

  @Delete()
  async unlikeComment(@Body() data: { commentId: string; userId: string }) {
    return this.likeService.unlikeComment(data);
  }
}
