import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReplyService } from './reply.service';


@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  createReply(
    @Body() data: { content: string; commentId: string; userId: string },
  ) {
    return this.replyService.createReply(data);
  }

  @Get('comment/:commentId')
  getRepliesByComment(@Param('commentId') commentId: string) {
    return this.replyService.getRepliesByComment(commentId);
  }
}
