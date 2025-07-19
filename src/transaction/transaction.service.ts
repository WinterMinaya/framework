import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './transaction.model';

const prisma = new PrismaClient();

function mapTransaction(transaction: any): Transaction {
  if (!transaction) return null;
  return {
    ...transaction,
    totalAmount: typeof transaction.totalAmount?.toNumber === 'function' ? transaction.totalAmount.toNumber() : transaction.totalAmount,
  };
}

@Injectable()
export class TransactionService {
  async findAll(): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({ include: { details: true } });
    return transactions.map(mapTransaction);
  }

  async findOne(id: number): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({ where: { id }, include: { details: true } });
    return mapTransaction(transaction);
  }

  async create(data: CreateTransactionDto): Promise<Transaction> {
    const transaction = await prisma.transaction.create({ data });
    return mapTransaction(transaction);
  }

  async update(id: number, data: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await prisma.transaction.update({ where: { id }, data });
    return mapTransaction(transaction);
  }

  async remove(id: number): Promise<Transaction> {
    const transaction = await prisma.transaction.delete({ where: { id } });
    return mapTransaction(transaction);
  }
}
