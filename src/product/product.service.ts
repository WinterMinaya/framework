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
    const products = await prisma.product.findMany();
    return products.map(mapProduct);
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    return mapProduct(product);
  }

  async create(data: CreateProductDto): Promise<Product> {
    const product = await prisma.product.create({ data });
    return mapProduct(product);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await prisma.product.update({ where: { id }, data });
    return mapProduct(product);
  }

  async remove(id: number): Promise<Product> {
    const product = await prisma.product.delete({ where: { id } });
    return mapProduct(product);
  }
}
