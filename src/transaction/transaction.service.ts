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
    const transactions = await prisma.transaction.findMany({ 
      where: { 
        status: { 
          not: 'CANCELLED' 
        } 
      },
      include: { details: true },
      orderBy: { createdAt: 'desc' }
    });
    return transactions.map(mapTransaction);
  }

  async findOne(id: number): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findFirst({ 
      where: { 
        id,
        status: { 
          not: 'CANCELLED' 
        } 
      }, 
      include: { details: true } 
    });
    return mapTransaction(transaction);
  }

  async create(data: CreateTransactionDto): Promise<Transaction> {
    const transactionData = {
      ...data,
      status: data.status || 'PENDING'
    };
    const transaction = await prisma.transaction.create({ data: transactionData });
    return mapTransaction(transaction);
  }

  async update(id: number, data: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await prisma.transaction.update({ 
      where: { 
        id,
        status: { 
          not: 'CANCELLED' 
        } 
      }, 
      data 
    });
    return mapTransaction(transaction);
  }

  async remove(id: number): Promise<Transaction> {
    // Eliminación lógica: cambiar status a CANCELLED
    const transaction = await prisma.transaction.update({ 
      where: { 
        id,
        status: { 
          not: 'CANCELLED' 
        } 
      }, 
      data: { 
        status: 'CANCELLED' 
      } 
    });
    return mapTransaction(transaction);
  }

  // Método adicional para obtener todas las transacciones (incluyendo canceladas)
  async findAllIncludingCancelled(): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      include: { details: true },
      orderBy: { createdAt: 'desc' }
    });
    return transactions.map(mapTransaction);
  }

  // Método para restaurar una transacción cancelada
  async restore(id: number): Promise<Transaction> {
    const transaction = await prisma.transaction.update({ 
      where: { id }, 
      data: { 
        status: 'PENDING' 
      } 
    });
    return mapTransaction(transaction);
  }
}
