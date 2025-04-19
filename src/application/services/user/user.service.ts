import { USER_ADMIN_ROLE_ID } from '@/infrastructure/config/constants';
import userRepository from '@/infrastructure/repositories/user.repository';
import { AppError } from '@/infrastructure/webserver/app-error';

export const checkIfUserAlreadyExistsByEmail = async (email: string) => {
  try {
    const user = await userRepository.findByEmail(email);
    if (user) {
      throw new AppError('Email já cadastrado', 400);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const checkIFUserIsAdmin = async (userId: string) => {
  try {
    const user = await getUserById(userId);
    if (user.role?.id !== USER_ADMIN_ROLE_ID) {
      throw new AppError('Usuário não é administrador', 400);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const listAllUsers = async () => {
  try {
    const users = await userRepository.listAll();
    if (!users) {
      throw new AppError('Nenhum usuário encontrado', 404);
    }
    return users;
  } catch (error) {
    throw error;
  }
};
