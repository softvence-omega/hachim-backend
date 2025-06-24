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
import { MotivationTrackService } from './motivation-track.service';
import { Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { CreateMotivationDto } from './dto/motivation-trac.dto';

@Controller('motivation-track')
export class MotivationTrackController {
  constructor(
    private readonly motivationTrackService: MotivationTrackService,
  ) {}

  @Post()
  async createMotivation(
    @Body() data:CreateMotivationDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const result = await this.motivationTrackService.createMotivation(
      data,
      req.user.sub,
    );

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Motivation recorded successfully',
      data: result,
    });
  }
  @Get()
  async getMotivationByUser(@Req() req, @Res() res: Response) {
    const result = await this.motivationTrackService.getMotivationByUser(
      req.user.sub,
    );

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Motivation data retrieved successfully',
      data: result,
    });
  }
}
