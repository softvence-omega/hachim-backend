import { BadRequestException, Body, Controller, HttpStatus, Patch, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import sendResponse from '../utils/sendResponse';
import { Public } from 'src/common/decorators/public.decorators';
import { RequestResetCodeDto, ResetPasswordDto, VerifyResetCodeDto } from './dto/forget-reset-password.dto';
import { Request, Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Public()
    @Post('register')
   async register(@Body() dto:RegisterDto, @Res() res:Response){
    const data=await this.authService.register(dto)
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User Register successfully',
      data,
    });
    }


@Public()
@Post('social-login')
async socialLogin(@Body('email') email: string,@Res() res:Response) {
  if(!email) throw new BadRequestException("email is required!")
   const data =await this.authService.socialLogin(email)
     return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User login successfully',
      data,
    });
}
 

   @Public()
    @Post('login')
   async login(@Body() dto:LoginDto,@Res() res:Response){
     const data =await this.authService.signIn(dto)
     return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User login successfully',
      data,
    });
    }

  @Public()
   @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken:string, @Res() res:Response){
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




@Patch('change-password')
async changePassword(
  @Body() dto: ChangePasswordDto,
  @Req() req: Request,
  @Res() res: Response,
) {
  const email = req.user?.email

  const data = await this.authService.changePassword(email!, dto);

  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data,
  });
}

// forget and reset password related api's 
  @Public()
  @Post('request-reset-code')
  async requestResetCode(@Body() dto: RequestResetCodeDto, @Res() res:Response) {
    const data = await this.authService.requestResetCode(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Reset code sent to email',
      data,
    });
  }

  @Public()
  @Post('verify-reset-code')
  async verifyResetCode(@Body() dto: VerifyResetCodeDto, @Res() res:Response) {
    const data = await this.authService.verifyResetCode(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Code verified successfully',
      data,
    });
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Res() res:Response) {
    const data = await this.authService.resetPassword(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password reset successfully',
      data,
    });
  }

}
