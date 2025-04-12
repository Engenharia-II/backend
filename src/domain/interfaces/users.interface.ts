export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  googleId?: string | null;
  roleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  lastAppAccess?: Date;
}
