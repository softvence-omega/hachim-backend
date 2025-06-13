import { Controller, Post, Body, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { RelapseService } from './relapse.service';
import sendResponse from '../utils/sendResponse';
import { CreateRelapseDto } from './dto/relapse.create.dto';
import { UpdateRelapseDto } from './dto/relapse.update.dto';
@Controller('relapse')
export class RelapseController {
  constructor(private readonly relapseService: RelapseService) {}

  @Post()
  async createRelapse(@Body() dto: CreateRelapseDto, @Res() res: Response) {
    const data = await this.relapseService.createRelapse(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Relapse record created successfully',
      data,
    });
  }

  @Put()
  async updateRelapse(@Body() dto: UpdateRelapseDto, @Res() res: Response) {
    const data = await this.relapseService.updateRelapse(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: dto.isDeleted
        ? 'Relapse and related data deleted successfully'
        : 'Relapse record updated successfully',
      data,
    });
  }
}
