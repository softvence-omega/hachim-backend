// src/modules/recovery/recovery.controller.ts
import { Controller, Get, Patch, Param, Body, NotFoundException, Req } from '@nestjs/common';
import { RecoveryService } from '../services/recovery.services';



@Controller('recovery')
export class RecoveryController {
  constructor(private recoveryService: RecoveryService) {}

  

  @Get()
  async getOne(@Req() req) {
    const userId = req.user.sub
    return this.recoveryService.getRecoveryByUserId(userId);
  }
}
