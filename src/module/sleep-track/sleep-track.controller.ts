import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SleepTrackService } from './sleep-track.service';

@Controller('sleep-track')
export class SleepTrackController {
  constructor(private readonly sleepTrackService: SleepTrackService) {}

  @Post()
  createSleep(@Body() data: { hours: number; userId: string }) {
    return this.sleepTrackService.createSleep(data);
  }

  @Get(':userId')
  getSleepByUser(@Param('userId') userId: string) {
    return this.sleepTrackService.getSleepByUser(userId);
  }
}
