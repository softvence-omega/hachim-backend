import { Body, Controller, Get, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import sendResponse from '../utils/sendResponse';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
constructor(private userService:UserService){}


@Get()
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
