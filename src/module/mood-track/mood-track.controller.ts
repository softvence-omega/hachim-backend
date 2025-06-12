import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MoodTrackService } from './mood-track.service';

@Controller('mood-track')
export class MoodTrackController {
  constructor(private readonly moodTrackService: MoodTrackService) {}

  @Post()
  createMood(@Body() data: { value: number; userId: string }) {
    return this.moodTrackService.createMood(data);
  }

  @Get(':userId')
  getMoodByUser(@Param('userId') userId: string) {
    return this.moodTrackService.getMoodByUser(userId);
  }
}
