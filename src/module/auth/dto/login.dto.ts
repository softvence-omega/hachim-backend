import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @IsString()
  @MinLength(6)
  password: string;
}
