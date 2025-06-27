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
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionService.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(id, dto);
  }

  @Public()
  @Get('active')
  getAllActive() {
    return this.subscriptionService.getAllActive();
  }



  @Get('all')
  @Roles(Role.ADMIN)
  async getAllActiveInActive(@Res() res:Response) {
    const data=await this.subscriptionService.getAllActiveInActive();
     return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'All subscription fetch successfully',
      data,
    });
  }

  @Public()
  @Get(':id')
  async getSingle(@Param('id') id: string,@Res() res:Response) {
    const data=await this.subscriptionService.getSingleSubscription(id);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'single subscription fetch successfully',
      data,
    });
  }



  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.subscriptionService.delete(id);
  }
}
