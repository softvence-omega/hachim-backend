import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import sendResponse from '../utils/sendResponse';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { Request, Response } from 'express';

@Controller('journal')
export class JournalController {
 constructor(private readonly journalService: JournalService) {}

  @Post('create')
 async create(@Body() dto: CreateJournalDto, @Req() req:Request, @Res() res:Response) {
    const data=await this.journalService.create(req.user!.sub, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Create Journal successfully',
      data,
    });
  }

 @Get()
 async findAll(@Req() req:Request, @Res() res:Response) {
    const data=await this.journalService.findAll(req.user!.sub);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrieve all Journal successfully',
      data,
    });
  }

  @Get(':id')
 async findOne(@Param('id') id: string, @Req() req, @Res() res) {
    const data=await this.journalService.findOne(id,req.user.sub);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrieve single Journal successfully',
      data,
    });
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Req() req:Request, @Res() res:Response, @Body() dto: UpdateJournalDto) {
    const data=await this.journalService.update(id,req.user!.sub,dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Update Journal successfully',
      data,
    });
  }

  @Delete(':id')
 async delete(@Param('id') id: string, @Req() req:Request, @Res() res:Response) {
    const data=await this.journalService.delete(id,req.user!.sub);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Delete Journal successfully',
      data,
    });
  }

}
