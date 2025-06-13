import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRelapseDto } from './dto/relapse.create.dto';
import { UpdateRelapseDto } from './dto/relapse.update.dto';


@Injectable()
export class RelapseService {
  constructor(private prisma: PrismaService) {}

  async createRelapse(dto: CreateRelapseDto) {
    const relapse = await this.prisma.relapse.create({
      data: {
        ...dto,
        isDeleted: false,
      },
    });
    return relapse;
  }

  async updateRelapse(dto: UpdateRelapseDto) {
    const relapse = await this.prisma.relapse.findUnique({
      where: { id: dto.id },
    });

    if (!relapse) {
      throw new NotFoundException('Relapse entry not found');
    }

    const updated = await this.prisma.relapse.update({
      where: { id: dto.id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });

    // If marked as deleted, delete related mood/sleep/motion tracks
    if (dto.isDeleted) {
      
    }

    return updated;
  }
}
