import { Controller, Post, Patch, Get, Delete, Body, Param, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create.subscription';
import { UpdateSubscriptionDto } from './dto/update.subscrition';


@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() dto: CreateSubscriptionDto, @Req() req) {
    return this.subscriptionService.create(dto,req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(id, dto);
  }

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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subscriptionService.delete(id);
  }
}
