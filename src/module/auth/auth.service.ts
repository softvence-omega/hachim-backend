import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {

constructor(private prisma:PrismaService){}

hashData(data:string){
     const saltRounds = parseInt(process.env.SALT_ROUND as string)
    return bcrypt.hash(data,saltRounds)
}

async register(dto:RegisterDto){
    if(dto.password!==dto.confirmPassword){
        throw new BadRequestException("Password and Confirm password doesn't match!")
    }
    const hashPassword = await this.hashData(dto.password);

    const result =await this.prisma.user.create({
        data:{
            userName:dto.userName,
            email:dto.email,
            password:hashPassword
        }
    })

    return result
}


}
