import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsNotEmpty({ message: 'Name is required!' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: 30,
    description: 'Age of the user (must be zero or greater)',
    minimum: 0,
  })
  @IsNotEmpty({ message: 'Age is required!' })
  @IsInt({ message: 'Age must be an integer' })
  @Min(0, { message: 'Age must be at least 0' })
  age: number;
}
