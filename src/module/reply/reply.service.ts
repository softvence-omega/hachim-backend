import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ReplyService {
  async createReply(data: {
    content: string;
    commentId: string;
  },userId:string) {
    return prisma.reply.create({
      data:{
        ...data,
        userId

      }
    });
  }

  async getRepliesByComment(commentId: string) {
    return prisma.reply.findMany({
      where: { commentId },
      include: {
        user: { select: { id: true, userName: true } },
      },
    });
  }
}
