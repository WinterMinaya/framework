import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
import { TransactionDetailController } from './transaction-detail/transaction-detail.controller';
import { TransactionDetailService } from './transaction-detail/transaction-detail.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoryController,
    ProductController,
    TransactionController,
    TransactionDetailController,
    UserController,
  ],
  providers: [
    AppService,
    CategoryService,
    ProductService,
    TransactionService,
    TransactionDetailService,
    UserService,
  ],
})
export class AppModule {}
