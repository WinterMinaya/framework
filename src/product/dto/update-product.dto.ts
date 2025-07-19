export class UpdateProductDto {
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  stock?: number;
  minStock?: number;
  isActive?: boolean;
  categoryId?: number;
}
