import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRecoveryDto } from '../dto/pdate-recovery.dto';

@Injectable()
export class RecoveryService {
  constructor(private readonly prisma: PrismaService) {}

  async updateRecovery(userId: string, dto: UpdateRecoveryDto) {
    console.log('======================hite===================')
    let current = await this.prisma.userRecovery.findUnique({
      where: { userId },
    });

    if (!current) {
      current = await this.prisma.userRecovery.create({
        data: {
          userId: userId,
        },
      });
    }

    if (!current) {
      throw new NotFoundException('Recovery record not found for this user');
    }

    // Handle partial updates
    const streak = dto.streakDays ?? current.streakDays;
    const sleep = dto.sleepScore ?? current.sleepScore;
    const mood = dto.moodScore ?? current.moodScore;

    const streakPart = (streak / 99) * 90;
    const sleepPart = (sleep / 100) * 5;
    const moodPart = (mood / 100) * 5;

    const totalCalculated = parseFloat(
      (streakPart + sleepPart + moodPart).toFixed(2),
    );

    const recoveryPercentage = Math.max(
      current.recoveryPercentage,
      totalCalculated,
    );

    const improvedConfidence =
      streak >= 7 ? Math.min(100, ((streak - 7) / 14) * mood) : 0;

    const mentalClarity =
      streak >= 10 ? Math.min(100, ((streak - 10) / 15) * sleep) : 0;

    const increasedLibido =
      streak >= 30
        ? Math.min(100, ((streak - 30) / 15) * ((sleep + mood) / 2))
        : 0;

    const updated = await this.prisma.userRecovery.update({
      where: { userId },
      data: {
        streakDays: streak,
        sleepScore: sleep,
        moodScore: mood,
        recoveryPercentage,
        improvedConfidence: parseFloat(improvedConfidence.toFixed(2)),
        mentalClarity: parseFloat(mentalClarity.toFixed(2)),
        increasedLibido: parseFloat(increasedLibido.toFixed(2)),
      },
    });

    return updated;
  }

  async getRecoveryByUserId(userId: string) {
    const record = await this.prisma.userRecovery.findUnique({
      where: { userId },
    });

    if (!record) {
      throw new NotFoundException('Recovery record not found for this user');
    }

    return record;
  }
}
