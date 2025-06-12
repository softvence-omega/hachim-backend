import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MoodTrackService {
  async createMood(data: { value: number; userId: string; relapseId: string }) {
  return prisma.moodTrack.upsert({
    where: { userId: data.userId },
    update: { value: data.value },
    create: { value: data.value, userId: data.userId, relapseId: data.relapseId },
  });
}

  async getMoodByUser(userId: string) {
    return prisma.moodTrack.findUnique({ where: { userId } });
  }
}
