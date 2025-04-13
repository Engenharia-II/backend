import { UserInterface } from '../interfaces/users.interface';

export const userEntities = (data: UserInterface) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    googleId: data.googleId,
    roleId: data.roleId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    lastAppAccess: data.lastAppAccess
  };
};
