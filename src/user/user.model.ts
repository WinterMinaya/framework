export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
