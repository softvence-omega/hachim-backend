// src/modules/recovery/recovery.module.ts
import { Module } from '@nestjs/common';
import { RecoveryController } from './controller/recovery.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecoveryService } from './services/recovery.services';


@Module({
  controllers: [RecoveryController],
  providers: [RecoveryService, PrismaService],
})
export class RecoveryModule {}
