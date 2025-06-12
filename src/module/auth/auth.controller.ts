import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import sendResponse from '../utils/sendResponse';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('register')
   async register(@Body() dto:RegisterDto, @Res() res){
    const data=await this.authService.register(dto)
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User Register successfully',
      data,
    });
    }

   @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken:string, @Res() res){
     if (!refreshToken) {
    throw new BadRequestException('Refresh token is required');
  }

   const data=await this.authService.refreshTokens(refreshToken)
     return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Refresh token created successfully',
      data,
    });
   }

    @Post('login')
   async login(@Body() dto:LoginDto,@Res() res){
     const data =await this.authService.signIn(dto)
     return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User login successfully',
      data,
    });
    }



}
