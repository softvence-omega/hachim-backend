import { Module } from '@nestjs/common';
import { SleepTrackService } from './sleep-track.service';
import { SleepTrackController } from './sleep-track.controller';
import { RecoveryService } from '../recovery/services/recovery.services';

@Module({
  controllers: [SleepTrackController],
  providers: [SleepTrackService,RecoveryService],
})
export class SleepTrackModule {}
