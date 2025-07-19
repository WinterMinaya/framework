export class CreateTransactionDto {
  transactionType: string;
  reference?: string;
  description?: string;
  totalItems?: number;
  totalAmount?: number;
  status?: string;
  createdBy?: string;
}
