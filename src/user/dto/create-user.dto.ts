import { IsEmail, isEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    userName:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string;
}