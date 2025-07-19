import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.model';

const prisma = new PrismaClient();

@Injectable()
export class CategoryService {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number): Promise<Category | null> {
    return prisma.category.findFirst({ 
      where: { 
        id,
        isActive: true 
      } 
    });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const categoryData = {
      ...data,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    return prisma.category.create({ data: categoryData });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    return prisma.category.update({ 
      where: { 
        id,
        isActive: true 
      }, 
      data 
    });
  }

  async remove(id: number): Promise<Category> {
    // Eliminación lógica: cambiar isActive a false
    return prisma.category.update({ 
      where: { 
        id,
        isActive: true 
      }, 
      data: { 
        isActive: false 
      } 
    });
  }

  // Método adicional para obtener todas las categorías (incluyendo inactivas)
  async findAllIncludingInactive(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // Método para restaurar una categoría eliminada lógicamente
  async restore(id: number): Promise<Category> {
    return prisma.category.update({ 
      where: { id }, 
      data: { 
        isActive: true 
      } 
    });
  }
}
