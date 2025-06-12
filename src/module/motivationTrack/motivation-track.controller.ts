import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MotivationTrackService } from './motivation-track.service';

@Controller('motivation-track')
export class MotivationTrackController {
  constructor(private readonly motivationTrackService: MotivationTrackService) {}

  @Post()
  createMotivation(@Body() data: { motivation: string; userId: string }) {
    return this.motivationTrackService.createMotivation(data);
  }

  @Get(':userId')
  getMotivationByUser(@Param('userId') userId: string) {
    return this.motivationTrackService.getMotivationByUser(userId);
  }
}
