import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { format } from 'date-fns';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateJournalDto) {
    const parsedDate = new Date(dto.date);

    return this.prisma.journal.create({
      data: {
        note: dto.note,
        date: parsedDate,
        mode: dto.mode,
        urge: dto.urge,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    const journals = await this.prisma.journal.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    // format the output if frontend wants human-readable time
    return journals.map((journal) => ({
      ...journal,
      formattedDate: format(journal.date, 'dd MMMM yy'),
      formattedTime: format(journal.date, 'hh:mm a'),
    }));
  }

  async findOne(id: string, userId: string) {
    const journal = await this.prisma.journal.findFirst({
      where: { id, userId },
    });

    if (!journal) return null;

    // formatting
    return {
      ...journal,
      formattedDate: format(journal.date, 'dd MMMM yy'),
      formattedTime: format(journal.date, 'hh:mm a'),
    };
  }

  async update(id: string, userId: string, dto: UpdateJournalDto) {
    const isJournalExist = await this.prisma.journal.findUnique({
      where: {
        id,
      },
    });

    if (!isJournalExist) {
      throw new BadRequestException('the journal is not exist!');
    }

    const data: any = {};
    if (dto.note !== undefined) data.note = dto.note;
    if (dto.mode !== undefined) data.mode = dto.mode;
    if (dto.urge !== undefined) data.urge = dto.urge;
    if (dto.date !== undefined) data.date = new Date(dto.date);

    return this.prisma.journal.update({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const isJournalExist = await this.prisma.journal.findUnique({
      where: {
        id,
      },
    });
    if (!isJournalExist) {
      throw new BadRequestException('the journal is not exist!');
    }
    return this.prisma.journal.delete({
      where: { id, userId },
    });
  }
}
