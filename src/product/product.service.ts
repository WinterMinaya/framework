import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model';

const prisma = new PrismaClient();

function mapProduct(product: any): Product {
  if (!product) return null;
  return {
    ...product,
    price: typeof product.price?.toNumber === 'function' ? product.price.toNumber() : product.price,
  };
}

@Injectable()
export class ProductService {
  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    return products.map(mapProduct);
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await prisma.product.findFirst({ 
      where: { 
        id,
        isActive: true 
      } 
    });
    return mapProduct(product);
  }

  async create(data: CreateProductDto): Promise<Product> {
    const productData = {
      ...data,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    const product = await prisma.product.create({ data: productData });
    return mapProduct(product);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await prisma.product.update({ 
      where: { 
        id,
        isActive: true 
      }, 
      data 
    });
    return mapProduct(product);
  }

  async remove(id: number): Promise<Product> {
    // Eliminación lógica: cambiar isActive a false
    const product = await prisma.product.update({ 
      where: { 
        id,
        isActive: true 
      }, 
      data: { 
        isActive: false 
      } 
    });
    return mapProduct(product);
  }

  // Método adicional para obtener todos los productos (incluyendo inactivos)
  async findAllIncludingInactive(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return products.map(mapProduct);
  }

  // Método para restaurar un producto eliminado lógicamente
  async restore(id: number): Promise<Product> {
    const product = await prisma.product.update({ 
      where: { id }, 
      data: { 
        isActive: true 
      } 
    });
    return mapProduct(product);
  }
}
