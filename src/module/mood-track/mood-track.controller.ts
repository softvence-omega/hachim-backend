import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MoodTrackService } from './mood-track.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';


@Controller('mood-track')
export class MoodTrackController {
  constructor(private readonly moodTrackService: MoodTrackService) {}

  @Post()
  async createMood(
    @Body() data:{ value: number; userId: string; relapseId: string },
    @Res() res: Response,
  ) {
    const result = await this.moodTrackService.createMood(data);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Mood recorded successfully',
      data: result,
    });
  }

  @Get(':userId')
  async getMoodByUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const result = await this.moodTrackService.getMoodByUser(userId);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User mood data retrieved successfully',
      data: result,
    });
  }
}
