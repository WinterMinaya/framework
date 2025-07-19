import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
