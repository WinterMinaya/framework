export interface Product {
  id: number;
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  minStock: number;
  isActive: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
