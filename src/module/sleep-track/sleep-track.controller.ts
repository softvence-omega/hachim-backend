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
import { RecoveryService } from '../recovery/services/recovery.services';
import { CreateSleepDto } from './dto/sleep-track.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('sleep-track')
export class SleepTrackController {
  constructor(
    private readonly sleepTrackService: SleepTrackService,
    private readonly recovery: RecoveryService

  ) {}

  @Post()
  async createSleep(
    @Body() data:CreateSleepDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.sleepTrackService.createSleep(data, req.user.sub);
        await this.recovery.updateRecovery(req.user.sub, {sleepScore:data.hours});
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Sleep hours recorded successfully',
      data: result,
    });
  }


  @Get()
  @ApiOperation({ summary: 'Get sleep data for the authenticated user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sleep data retrieved successfully',
  })
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
