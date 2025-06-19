import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  RequestResetCodeDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from './dto/forget-reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  //register
  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ userName: dto.userName }, { email: dto.email }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('The email or username is already exist!');
    }
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(
        "Password and Confirm password doesn't match!",
      );
    }
    const hashPassword = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        userName: dto.userName,
        email: dto.email,
        password: hashPassword,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );

    return { newUser, ...tokens };
  }

  // socialLogin
  async socialLogin(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Create new user if not exists
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
        },
      });
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);

    return {
      message: 'Login successful',
      user,
      ...tokens,
    };
  }

  //login
  async signIn(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password!);
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    return tokens;
  }

  //refresh token
  async refreshTokens(token: string) {
    try {
      if (!token) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      const user = await this.prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this.getTokens(user?.id, user?.email, user.role);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  //change password
  async changePassword(email: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      throw new NotFoundException('User not found or password not set');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException(
        "New password and confirm password don't match",
      );
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return { email };
  }

  // forget and reset password

  async requestResetCode({ email }: RequestResetCodeDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const code = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    const hashedCode = await bcrypt.hash(code, 10);
    await this.prisma.otpCode.create({
      data: { email, code: hashedCode, expiresAt },
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your password reset code',
      text: `Your code is ${code}. It expires in 5 minutes.`,
    });

    return { message: 'OTP sent to your email' };
  }

  async verifyResetCode({ email, code }: VerifyResetCodeDto) {
    const record = await this.prisma.otpCode.findFirst({
      where: { email, verified: false },
      orderBy: { createdAt: 'desc' },
    });
    if (!record) throw new BadRequestException('Invalid code');
    if (record.expiresAt < new Date())
      throw new BadRequestException('Code expired');

    const isMatch = await bcrypt.compare(code, record.code);
    if (!isMatch) throw new BadRequestException('Invalid code');

    await this.prisma.otpCode.update({
      where: { id: record.id },
      data: { verified: true },
    });

    return { message: 'Code verified successfully' };
  }

  async resetPassword({ email, password, confirmPassword }: ResetPasswordDto) {
    if (password !== confirmPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const verifiedOtp = await this.prisma.otpCode.findFirst({
      where: { email, verified: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!verifiedOtp) {
      throw new BadRequestException('No verified OTP found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await this.prisma.otpCode.deleteMany({ where: { email } });

    return { message: 'Password reset successful' };
  }

  // utilities
  async getTokens(userId: string, email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIREIN,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIREIN,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  hashData(data: string) {
    const saltRounds = parseInt(process.env.SALT_ROUND as string);
    return bcrypt.hash(data, saltRounds);
  }
}
