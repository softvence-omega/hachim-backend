import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRelapseDto } from './dto/relapse.create.dto';


@Injectable()
export class RelapseService {
  constructor(private prisma: PrismaService) {}

 async createOrUpdateRelapse(newdto: CreateRelapseDto, userId: string) {
  const { startDate, ...dto } = newdto;

  const relapse = await this.prisma.relapse.upsert({
    where: { userId },
    update: {
      ...dto,
      updatedAt: new Date(),
    },
    create: {
      ...dto,
      isDeleted: false,
      userId,
    },
  });

  const timeDifferent = relapse.createdAt.getTime() - new Date(startDate).getTime();

  return {
    timeDifferent,
    relapse,
  };
}

  async resetOptionalFields(userId: string) {
    
    const existing = await this.prisma.relapse.findUnique({
      where: { userId },
    });

    if (!existing) {
      throw new NotFoundException('Relapse record not found for this user');
    }

    const updated = await this.prisma.relapse.update({
      where: { userId },
      data: {
        Mood: null,
        urg: null,
        Triggers: null,
        note: null,
        spendDate: null,
        level: null,
       
      },
    });


await Promise.all([
  this.prisma.moodTrack.upsert({
    where: { userId },
    update: { value: 0 },
    create: { value: 0, userId },
  }),

  this.prisma.motivationTrack.upsert({
    where: { userId },
    update: { motivation: "" },
    create: { motivation: "", userId },
  }),

  this.prisma.sleepTrack.upsert({
    where: { userId },
    update: { hours: 0 },
    create: { hours: 0, userId },
  }),
]);



    return updated;
  }

}
