import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
@IsString()
@IsNotEmpty()
userName:string

@IsEmail()
email:string

@IsString()
@MinLength(6)
password:string

@IsString()
@MinLength(6)
confirmPassword:string
}