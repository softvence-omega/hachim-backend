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
@Controller('relapse')
export class RelapseController {
  constructor(private readonly relapseService: RelapseService) {}

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
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Relapse record created successfully',
      data,
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
