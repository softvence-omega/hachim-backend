import {
  Controller,
  Post,
  Body,
  Put,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { RelapseService } from './relapse.service';
import sendResponse from '../utils/sendResponse';
import { CreateRelapseDto } from './dto/relapse.create.dto';
import { UpdateRelapseDto } from './dto/relapse.update.dto';
import { RecoveryService } from '../recovery/services/recovery.services';
@Controller('relapse')
export class RelapseController {
  constructor(
    private readonly relapseService: RelapseService,
    private readonly recovery: RecoveryService,
  ) {}

  @Post()
  async createRelapse(
    @Body() dto: CreateRelapseDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const data = await this.relapseService.createOrUpdateRelapse(
      dto,
      req.user.sub,
    );
    const timeDifferentInDays: number = Math.floor(
      data.timeDifferent / (1000 * 60 * 60 * 24),
    );
    const cappedStreakDays = Math.min(Math.abs(timeDifferentInDays), 90);

   const recovery = await this.recovery.updateRecovery(req.user.sub, {
      streakDays: cappedStreakDays,
    });

    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Relapse record created successfully',
      data:{...data, level: recovery.level},
    });
  }

  @Put('reset')
  async resetOptionalFields(@Req() req, @Res() res: Response) {
    const result = await this.relapseService.resetOptionalFields(req.user.sub);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Relapse optional fields reset to null',
      data: result,
    });
  }
}
