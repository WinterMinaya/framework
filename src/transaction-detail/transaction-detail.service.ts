import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTransactionDetailDto } from './dto/create-transaction-detail.dto';
import { UpdateTransactionDetailDto } from './dto/update-transaction-detail.dto';
import { TransactionDetail } from './transaction-detail.model';

const prisma = new PrismaClient();

function mapDetail(detail: any): TransactionDetail {
  if (!detail) return null;
  return {
    ...detail,
    unitPrice: typeof detail.unitPrice?.toNumber === 'function' ? detail.unitPrice.toNumber() : detail.unitPrice,
    subtotal: typeof detail.subtotal?.toNumber === 'function' ? detail.subtotal.toNumber() : detail.subtotal,
  };
}

@Injectable()
export class TransactionDetailService {
  async findAll(): Promise<TransactionDetail[]> {
    const details = await prisma.transactionDetail.findMany();
    return details.map(mapDetail);
  }

  async findOne(id: number): Promise<TransactionDetail | null> {
    const detail = await prisma.transactionDetail.findUnique({ where: { id } });
    return mapDetail(detail);
  }

  async create(data: CreateTransactionDetailDto): Promise<TransactionDetail> {
    const detail = await prisma.transactionDetail.create({ data });
    return mapDetail(detail);
  }

  async update(id: number, data: UpdateTransactionDetailDto): Promise<TransactionDetail> {
    const detail = await prisma.transactionDetail.update({ where: { id }, data });
    return mapDetail(detail);
  }

  async remove(id: number): Promise<TransactionDetail> {
    const detail = await prisma.transactionDetail.delete({ where: { id } });
    return mapDetail(detail);
  }
}
