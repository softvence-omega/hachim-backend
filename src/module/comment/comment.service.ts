import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommentService {
  async createComment(data: {
    content: string;
    postId: string;
    userId: string;
  }) {
    return prisma.comment.create({
      data,
    });
  }

  async getCommentsByPost(postId: string) {
    return prisma.comment.findMany({
      where: { postId },
      include: {
        user: { select: { id: true, userName: true } },
        likes: true,
        reply: {
          include: { user: { select: { userName: true } } },
        },
      },
    });
  }
}
