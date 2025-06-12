import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MoodTrackService {
  async createMood(data: { value: number; userId: string }) {
    return prisma.moodTrack.upsert({
      where: { userId: data.userId },
      update: { value: data.value },
      create: { value: data.value, userId: data.userId },
    });
  }

  async getMoodByUser(userId: string) {
    return prisma.moodTrack.findUnique({ where: { userId } });
  }
}
