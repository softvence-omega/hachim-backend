import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create.subscription';
import { UpdateSubscriptionDto } from './dto/update.subscrition';


@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubscriptionDto) {

  const data = await this.prisma.subscription.create({
    data: {
      amount: dto.amount,
      durationDays: dto.durationDays,
    },
  });

  return { message: "Subscription created successfully", data };
}


 async update(id: string, dto: UpdateSubscriptionDto) {
  const exists = await this.prisma.subscription.findUnique({ where: { id } });
  if (!exists) throw new NotFoundException('Subscription not found');

  return this.prisma.subscription.update({
    where: { id },
    data: {
      ...(dto.amount !== undefined && { amount: dto.amount }),
      ...(dto.durationDays !== undefined && { durationDays: dto.durationDays }),
      ...(dto.isActive !== undefined && { isActive: dto.isActive }),
    },
  });
}


  async getAllActive() {
    return this.prisma.subscription.findMany({
      where: {
        isActive: true,
      
      },
    });
  }

  async getAllActiveInActive() {
    return this.prisma.subscription.findMany();
  }

  async getSingleSubscription(id:string) {
    const result = await this.prisma.subscription.findUnique({
      where:{id,isActive:true}
    })
    return result
  }

  async delete(id: string) {
    const exists = await this.prisma.subscription.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Subscription not found');

    return this.prisma.subscription.delete({ where: { id } });
  }
}
