// src/modules/payment/payment.module.ts

import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller';
import { PaymentService } from './services/payment.services';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService,],
  imports:[PrismaService]
})
export class PaymentModule { }
