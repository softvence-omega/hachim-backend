import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MotivationTrackService {
  async createMotivation(data: { motivation: string; userId: string }) {
    return prisma.motivationTrack.upsert({
      where: { userId: data.userId },
      update: { motivation: data.motivation },
      create: { motivation: data.motivation, userId: data.userId },
    });
  }

  async getMotivationByUser(userId: string) {
    return prisma.motivationTrack.findUnique({ where: { userId } });
  }
}
