import { RoleInterface } from './roles.interface';

export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  googleId?: string | null;
  roleId?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  lastAppAccess?: Date | null;
  role?: RoleInterface | null;
}
