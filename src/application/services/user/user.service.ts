import { UserInterface } from '@/domain/interfaces/users.interface';
import PasswordHash from '@/application/security/bcrypt';
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

export const updateUser = async ({
  id,
  name,
  email,
  password
}: UserInterface) => {
  try {
    const oldUser = await getUserById(id as string);

    const userEmail = await userRepository.findByEmail(email);
    if (userEmail && userEmail.id !== id) {
      throw new AppError('Email já cadastrado', 400);
    }

    if (password) {
      const hashedPassword = await PasswordHash.hash(password);
      password = hashedPassword;
    } else {
      password = oldUser.password;
    }

    const user = await userRepository.update({ id, name, email, password });
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await getUserById(id);
    await userRepository.delete(id);
  } catch (error) {
    throw error;
  }
};

export const updateLastAppAccess = async (userId: string) => {
  try {
    await getUserById(userId);
    await userRepository.updateLastAppAccess(userId);
  } catch (error) {
    throw error;
  }
};
