export class CreateCategoryDto {
  name: string;
  description?: string;
  isActive?: boolean; // Por defecto será true en el servicio
}
