import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
