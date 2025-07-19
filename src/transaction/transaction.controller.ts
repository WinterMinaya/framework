import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get('all')
  findAllIncludingCancelled() {
    return this.transactionService.findAllIncludingCancelled();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateTransactionDto) {
    return this.transactionService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTransactionDto) {
    return this.transactionService.update(+id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.transactionService.restore(+id);
  }
}
