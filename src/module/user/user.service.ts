import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

}
