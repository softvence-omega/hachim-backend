import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class LikeService {
  async likeComment(data: { commentId: string }, userId: string) {
    try {
      return await prisma.like.create({
        data: {
          ...data,
          userId,
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new HttpException(
          'You have already liked this comment.',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw err;
    }
  }

  async unlikeComment(data: { commentId: string }, userId: string) {
    return prisma.like.delete({
      where: {
        userId_commentId: {
          userId,
          commentId: data.commentId,
        },
      },
    });
  }
}
