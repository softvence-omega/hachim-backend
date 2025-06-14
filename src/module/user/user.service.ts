import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
constructor( private prisma:PrismaService){}

async getAllUser(){
const result = await this.prisma.user.findMany({
    select:{
        password:false
    }
});
return result;
}


async updateUser(email:string,dto:UpdateUserDto){
    const result = await this.prisma.user.update({
        where:{
         email
        },
        data:{
        name:dto.name,
        age: dto.age
    }
    })

    return result
}


}
