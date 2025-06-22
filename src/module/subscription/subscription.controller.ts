import { Controller, Post, Patch, Get, Delete, Body, Param, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create.subscription';
import { UpdateSubscriptionDto } from './dto/update.subscrition';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorators';


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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subscriptionService.delete(id);
  }
}
