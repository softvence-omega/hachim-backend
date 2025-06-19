import { Module } from '@nestjs/common';
import { MoodTrackService } from './mood-track.service';
import { MoodTrackController } from './mood-track.controller';
import { RecoveryService } from '../recovery/services/recovery.services';

@Module({
  controllers: [MoodTrackController],
  providers: [MoodTrackService,RecoveryService],
})
export class MoodTrackModule {}
