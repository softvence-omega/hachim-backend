import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SleepTrackService } from './sleep-track.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';

@Controller('sleep-track')
export class SleepTrackController {
  constructor(private readonly sleepTrackService: SleepTrackService) {}

  @Post()
  async createSleep(
    @Body() data: { hours: number; userId: string; relapseId: string },
    @Res() res: Response,
  ) {
    const result = await this.sleepTrackService.createSleep(data);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Sleep hours recorded successfully',
      data: result,
    });
  }

  @Get(':userId')
  async getSleepByUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const result = await this.sleepTrackService.getSleepByUser(userId);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Sleep data retrieved successfully',
      data: result,
    });
  }
}
