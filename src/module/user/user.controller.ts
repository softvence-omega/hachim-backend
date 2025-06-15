import { Body, Controller, Get, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import sendResponse from '../utils/sendResponse';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('user')
export class UserController {
constructor(private userService:UserService){}


@Post('admin/create')
  @Roles(Role.ADMIN)
  async createAdmin(
    @Body() dto: CreateAdminDto,
    @Res() res: Response,
  ) {
    const data = await this.userService.createAdmin(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Admin created successfully',
      data,
    });
  }

@Get()
@Roles(Role.ADMIN)
async getAllUser(@Res() res:Response){
    const data= await this.userService.getAllUser()
    return sendResponse(res,
     {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrive all users successfully',
      data,
    });
}


@Patch('update')
async updateUser(@Body() dto:UpdateUserDto,@Req() req:Request,@Res() res:Response){
  const email = req.user?.email
  const data= await this.userService.updateUser(email!,dto)
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Update user successfully',
      data,
    });
}

}
