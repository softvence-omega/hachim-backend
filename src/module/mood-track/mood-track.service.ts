import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MoodTrackService {
  async createMood(data: { value: number; }, userId: string) {
  return prisma.moodTrack.upsert({
    where: { userId},
    update: { value: Number(data.value )},
    create: { value: Number(data.value), userId, },
  });
}

  async getMoodByUser(userId: string) {
    return prisma.moodTrack.findUnique({ where: { userId } });
  }
}
