import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MotivationTrackService {
  constructor(private readonly prisma: PrismaService) {}

  async createMotivation(data: { motivation: string }, userId: string) {
    console.log('Received data:', data, 'UserID:', userId);

    // Check if the user exists to avoid foreign key constraint error
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Check if a motivation already exists for this user
    const existing = await this.prisma.motivationTrack.findUnique({
      where: { userId },
    });

    if (existing) {
      // Update existing motivation
      return this.prisma.motivationTrack.update({
        where: { userId },
        data: { motivation: data.motivation },
      });
    }

    // Create new motivation entry
    return this.prisma.motivationTrack.create({
      data: {
        motivation: data.motivation,
        userId,
      },
    });
  }

  async getMotivationByUser(userId: string) {
    return this.prisma.motivationTrack.findUnique({ where: { userId } });
  }

}


 