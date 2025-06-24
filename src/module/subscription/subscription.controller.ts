import { Controller, Post, Patch, Get, Delete, Body, Param, Req, HttpStatus, Res } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create.subscription';
import { UpdateSubscriptionDto } from './dto/update.subscrition';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorators';
import sendResponse from '../utils/sendResponse';
import { Response } from 'express';


@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateSubscriptionDto, @Req() req) {
    return this.subscriptionService.create(dto,req.user.sub);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(id, dto);
  }

  @Public()
  @Get('active/')
  getAllActive(@Req() req) {
     const userId = req.user.sub
    return this.subscriptionService.getAllActive(userId);
  }

  @Get('user/')
  getAll(@Req() req) {
    const userId = req.user.sub
    return this.subscriptionService.getAll(userId);
  }

  @Get('all')
  @Roles(Role.ADMIN)
  async getAllActiveInActive(@Res() res:Response) {
    const data=await this.subscriptionService.getAllActiveInActive();
     return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Admin created successfully',
      data,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.subscriptionService.delete(id);
  }
}
