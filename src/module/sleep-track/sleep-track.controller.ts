import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { SleepTrackService } from './sleep-track.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';

@Controller('sleep-track')
export class SleepTrackController {
  constructor(private readonly sleepTrackService: SleepTrackService) {}

  @Post()
  async createSleep(
    @Body() data: { hours: number },
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.sleepTrackService.createSleep(data, req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Sleep hours recorded successfully',
      data: result,
    });
  }

  @Get()
  async getSleepByUser(@Req() req, @Res() res: Response) {
    const result = await this.sleepTrackService.getSleepByUser(req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Sleep data retrieved successfully',
      data: result,
    });
  }
}
