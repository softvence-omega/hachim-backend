import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(dto: CreateAdminDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const admin = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };
  }

  async getAllUser() {
    const result = await this.prisma.user.findMany();
    return result;
  }

  async updateUser(email: string, dto: UpdateUserDto) {
    const result = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        name: dto.name,
        age: dto.age,
      },
    });

    return result;
  }
}
