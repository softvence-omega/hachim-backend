import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommentService {
  async createComment(data: { content: string }, userId: string) {
    return prisma.comment.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getCommentsByPost(postId: string) {
    return prisma.comment.findMany({
      where: { id: postId }, // Consider changing to where: { postId }
      include: {
        user: { select: { id: true, userName: true } },
        likes: true,
        reply: {
          include: {
            user: { select: { userName: true } },
          },
        },
      },
    });
  }

  async getAllComments(limit: number) {
    return prisma.comment.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: { select: { id: true, userName: true } },
        reply: {
          include: { user: { select: { userName: true } } },
        },
        _count: {
          select: { likes: true },
        },
      },
    });
  }
}
