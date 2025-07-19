import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number): Promise<User | null> {
    return prisma.user.findFirst({ 
      where: { 
        id,
        isActive: true 
      } 
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const userData = {
      ...data,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    return prisma.user.create({ data: userData });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return prisma.user.update({ 
      where: { 
        id,
        isActive: true 
      }, 
      data 
    });
  }

  async remove(id: number): Promise<User> {
    // Eliminación lógica: cambiar isActive a false
    return prisma.user.update({ 
      where: { 
        id,
        isActive: true 
      }, 
      data: { 
        isActive: false 
      } 
    });
  }

  // Método adicional para obtener todos los usuarios (incluyendo inactivos)
  async findAllIncludingInactive(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // Método para restaurar un usuario eliminado lógicamente
  async restore(id: number): Promise<User> {
    return prisma.user.update({ 
      where: { id }, 
      data: { 
        isActive: true 
      } 
    });
  }
}
