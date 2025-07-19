export interface TransactionDetail {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
}
