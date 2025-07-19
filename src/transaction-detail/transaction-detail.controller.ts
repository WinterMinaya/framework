import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TransactionDetailService } from './transaction-detail.service';
import { CreateTransactionDetailDto } from './dto/create-transaction-detail.dto';
import { UpdateTransactionDetailDto } from './dto/update-transaction-detail.dto';

@Controller('transaction-details')
export class TransactionDetailController {
  constructor(private readonly transactionDetailService: TransactionDetailService) {}

  @Get()
  findAll() {
    return this.transactionDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionDetailService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateTransactionDetailDto) {
    return this.transactionDetailService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTransactionDetailDto) {
    return this.transactionDetailService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionDetailService.remove(+id);
  }
}
