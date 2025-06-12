import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MotivationTrackService } from './motivation-track.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';

@Controller('motivation-track')
export class MotivationTrackController {
  constructor(
    private readonly motivationTrackService: MotivationTrackService,
  ) {}

@Post()
  async createMotivation(
    @Body() data: { motivation: string; userId: string; relapseId: string },
    @Res() res: Response,
  ) {
    
      const result = await this.motivationTrackService.createMotivation(data);

      return sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Motivation recorded successfully',
        data: result,
      });
    
  }
  @Get(':userId')
  async getMotivationByUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const result = await this.motivationTrackService.getMotivationByUser(
      userId,
    );

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Motivation data retrieved successfully',
      data: result,
    });
  }
}
