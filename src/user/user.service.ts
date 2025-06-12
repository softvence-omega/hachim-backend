import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}

    async createUser(dto: CreateUserDto){
        const isUserExist = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })

        if(isUserExist){
      throw new BadRequestException("The user is already exist!")
        }

        const hashedPassword = await bcrypt.hash(dto.password,10);
        const result = await this.prisma.user.create({
            data:{
                name:dto.name,
                email:dto.email,
                password:hashedPassword
            }
        })

        return result
    }


    async getAllUser(){

    }

    async getUserByIdI(){

    }


    async updateUser(){}

    async deleteUser(){}
}
