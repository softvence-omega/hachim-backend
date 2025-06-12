import { Module } from '@nestjs/common';
import { MotivationTrackService } from './motivation-track.service';
import { MotivationTrackController } from './motivation-track.controller';

@Module({
  controllers: [MotivationTrackController],
  providers: [MotivationTrackService],
})
export class MotivationTrackModule {}
