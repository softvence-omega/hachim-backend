import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MotivationTrackService {
 async createMotivation(data: { motivation: string; userId: string; relapseId: string }) {
  const existing = await prisma.motivationTrack.findUnique({
    where: { userId: data.userId }, // or consider a compound unique if needed
  });

  if (existing) {
    return prisma.motivationTrack.update({
      where: { userId: data.userId },
      data: { motivation: data.motivation },
    });
  }

  return prisma.motivationTrack.create({
    data: {
      motivation: data.motivation,
      userId: data.userId,
      relapseId: data.relapseId,
    },
  });
}


  async getMotivationByUser(userId: string) {
    return prisma.motivationTrack.findUnique({ where: { userId } });
  }
}
