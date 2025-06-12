import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

constructor(
    private prisma:PrismaService,
    private jwtService:JwtService
){}



//register 
async register(dto:RegisterDto){
const existingUser = await this.prisma.user.findFirst({
  where: {
    OR:[
        {userName:dto.userName},
        {email:dto.email}
    ]
  }
});

if (existingUser) {
  throw new BadRequestException('The email or username is already exist!');
}
    if(dto.password!==dto.confirmPassword){
        throw new BadRequestException("Password and Confirm password doesn't match!")
    }
    const hashPassword = await this.hashData(dto.password);

    const newUser =await this.prisma.user.create({
        data:{
            userName:dto.userName,
            email:dto.email,
            password:hashPassword
        }
    })

    const tokens=await this.getTokens(newUser.id,newUser.email);

    return {newUser,...tokens}
}

async signIn(dto:LoginDto){
    const user= await this.prisma.user.findUnique({
        where:{
            email:dto.email
        }
    })

    if(!user){
        throw new ForbiddenException("Invalid Credentials")
    }

    const passwordMatches = await bcrypt.compare(dto.password,user.password);
    if(!passwordMatches){
      throw new ForbiddenException("Invalid Credentials")
    }

   const tokens=await this.getTokens(user.id,user.email);
   console.log(tokens);
   return tokens
}

// utilities 
async getTokens(userId:string,email:string){
    const [at,rt]= await Promise.all([
        this.jwtService.signAsync(
            {
                sub:userId,
                email
            },
            {
             secret:process.env.ACCESS_TOKEN_SECRET,
             expiresIn:process.env.ACCESS_TOKEN_EXPIREIN
            }
        ),
        this.jwtService.signAsync(
            {
                sub:userId,
                email
            },
            {
             secret:process.env.REFRESH_TOKEN_SECRET,
             expiresIn:process.env.REFRESH_TOKEN_EXPIREIN
            }
        )
    ])

    return {
        access_token:at,
        refresh_token:rt
    }
}

hashData(data:string){
     const saltRounds = parseInt(process.env.SALT_ROUND as string)
    return bcrypt.hash(data,saltRounds)
}



}
