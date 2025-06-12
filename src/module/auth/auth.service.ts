import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"


@Injectable()
export class AuthService {

constructor(private prisma:PrismaService){}

hashData(data:string){
    return bcrypt.hash(data,process.env.SOLT_ROUND as string)
}




}
