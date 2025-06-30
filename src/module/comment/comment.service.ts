import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/comment.dto';

const prisma = new PrismaClient();

@Injectable()
export class CommentService {
  async createComment(data: CreateCommentDto, userId: string) {
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

  // async getAllComments() {
  //   return prisma.comment.findMany({
      
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     include: {
  //       user: { select: { id: true, userName: true } },
  //       reply: {
  //         include: { user: { select: { userName: true } } },
  //       },
  //       _count: {
  //         select: { likes: true },
  //       },
  //     },
  //   });
  // }


  async getAllComments(currentUserId: string) {
  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          id: true,
          userName: true,
        },
      },
      reply: {
        include: {
          user: {
            select: {
              userName: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: currentUserId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  return comments.map(comment => ({
    ...comment,
    isLiked: comment.likes.length > 0,
    
  }));
}

}
