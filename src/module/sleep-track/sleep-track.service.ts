import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SleepTrackService {
  async createSleep(data: { hours: number; userId: string }) {
    return prisma.sleepTrack.upsert({
      where: { userId: data.userId },
      update: { hours: data.hours },
      create: { hours: data.hours, userId: data.userId },
    });
  }

  async getSleepByUser(userId: string) {
    return prisma.sleepTrack.findUnique({ where: { userId } });
  }
}
