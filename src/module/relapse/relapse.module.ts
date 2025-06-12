import { Module } from '@nestjs/common';
import { RelapseController } from './relapse.controller';
import { RelapseService } from './relapse.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RelapseController],
  providers: [RelapseService, PrismaService],
})
export class RelapseModule {}
