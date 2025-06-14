// dto/request-reset-code.dto.ts
import { IsEmail, IsString, Length, Matches, MinLength, ValidateIf } from 'class-validator';

export class RequestResetCodeDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}

// dto/verify-reset-code.dto.ts
export class VerifyResetCodeDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @Length(4, 4, { message: 'Code must be 4 characters' })
  code: string;
}

// dto/reset-password.dto.ts
export class ResetPasswordDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  confirmPassword: string;
}
