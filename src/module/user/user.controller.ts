import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import sendResponse from '../utils/sendResponse';

@Controller('user')
export class UserController {

constructor(private userService:UserService){}

@Get()
async getAllUser(@Res() res){
    const data= await this.userService.getAllUser()
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Retrive all users successfully',
      data,
    });
}

}
