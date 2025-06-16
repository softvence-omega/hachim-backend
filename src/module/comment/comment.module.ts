import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { LikeController } from '../like/like.controller';
import { ReplyController } from '../reply/reply.controller';
import { CommentService } from './comment.service';
import { LikeService } from '../like/like.service';
import { ReplyService } from '../reply/reply.service';

@Module({
  controllers: [CommentController, LikeController, ReplyController],
  providers: [CommentService, LikeService, ReplyService],
})
export class CommentModule {}
