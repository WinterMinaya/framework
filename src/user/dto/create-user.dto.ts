export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: string;
  isActive?: boolean;
}
