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
    


    


    
    const timeDifferent =
       new Date(startDate).getTime() - relapse.createdAt.getTime()



      await this.prisma.relapse.update({
        where: { userId },
        data: {
          spendDate:timeDifferent ?? 0,
        },
      });
      ;




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

    const recoveryupdate = await this.prisma.userRecovery.update({
  where: { userId },
  data: {
    streakDays: 0,
    sleepScore: 0,
    moodScore: 0,
    recoveryPercentage: 0,
    improvedConfidence: 0,
    increasedLibido: 0,
    mentalClarity: 0,
    level: 0,
    
    
    
   
    
  },
});



    const updated = await this.prisma.relapse.update({
      where: { userId },
      data: {
        Mood: null,
        urg: null,
        Triggers: null,
        note: null,
        spendDate: 0,
        level: null,
         createdAt: new Date(),
        
        
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
        update: { motivation: '' },
        create: { motivation: '', userId },
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
