import { Module } from '@nestjs/common';
import { RelapseController } from './relapse.controller';
import { RelapseService } from './relapse.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoodTrackService } from '../mood-track/mood-track.service';
import { RecoveryService } from '../recovery/services/recovery.services';

@Module({
  controllers: [RelapseController],
  providers: [RelapseService, PrismaService,RecoveryService],
})
export class RelapseModule {}
