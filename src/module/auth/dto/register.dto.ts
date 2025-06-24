import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiPropertyOptional({
    example: 'john_doe',
    description: 'Optional username of the user',
  })
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  userName?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password with at least 6 characters',
  })
  @IsNotEmpty({ message: 'Password is required!' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Confirm password (must match password)',
  })
  @IsNotEmpty({ message: 'Confirm password is required!' })
  @IsString({ message: 'Confirm password must be a string' })
  @MinLength(6, { message: 'Confirm password must be at least 6 characters' })
  confirmPassword: string;
}
