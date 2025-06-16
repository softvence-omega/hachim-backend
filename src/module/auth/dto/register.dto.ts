import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
@IsOptional()
@IsString()
@IsNotEmpty()
userName:string

@IsNotEmpty({message:"email is required!"})
@IsEmail()
email:string

@IsNotEmpty({message:"password is required!"})
@IsString()
@MinLength(6)
password:string

@IsNotEmpty({message:"confirm password is required!"})
@IsString()
@MinLength(6)
confirmPassword:string
}