import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.model';

const prisma = new PrismaClient();

@Injectable()
export class CategoryService {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category | null> {
    return prisma.category.findUnique({ where: { id } });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return prisma.category.create({ data });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    return prisma.category.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Category> {
    return prisma.category.delete({ where: { id } });
  }
}
