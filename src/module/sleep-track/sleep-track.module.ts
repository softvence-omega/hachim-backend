import { Module } from '@nestjs/common';
import { SleepTrackService } from './sleep-track.service';
import { SleepTrackController } from './sleep-track.controller';

@Module({
  controllers: [SleepTrackController],
  providers: [SleepTrackService],
})
export class SleepTrackModule {}
