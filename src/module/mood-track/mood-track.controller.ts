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
import { MoodTrackService } from './mood-track.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { RecoveryService } from '../recovery/services/recovery.services';

@Controller('mood-track')
export class MoodTrackController {
  constructor(
    private readonly moodTrackService: MoodTrackService,
     private readonly recovery: RecoveryService
  ) {}

  @Post()
  async createMood(
    @Body() data: { value: number; userId: string },
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.moodTrackService.createMood(data, req.user.sub);
     
     await this.recovery.updateRecovery(req.user.sub, { moodScore:result.value});
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Mood recorded successfully',
      data: result,
    });
  }

  @Get()
  async getMoodByUser(@Req() req, @Res() res: Response) {
    const result = await this.moodTrackService.getMoodByUser(req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User mood data retrieved successfully',
      data: result,
    });
  }
}
