export interface Transaction {
  id: number;
  transactionType: string;
  reference?: string;
  description?: string;
  totalItems: number;
  totalAmount: number;
  status: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
