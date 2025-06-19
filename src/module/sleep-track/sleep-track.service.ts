import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SleepTrackService {
  async createSleep(data: { hours: number }, userId: string) {
    return prisma.sleepTrack.upsert({
      where: { userId },
      update: { hours: Number(data.hours) },
      create: { hours: Number(data.hours), userId },
    });
  }

  async getSleepByUser(userId: string) {
    return prisma.sleepTrack.findUnique({ where: { userId } });
  }
}
