import { Module } from '@nestjs/common';
import { MoodTrackService } from './mood-track.service';
import { MoodTrackController } from './mood-track.controller';

@Module({
  controllers: [MoodTrackController],
  providers: [MoodTrackService],
})
export class MoodTrackModule {}
