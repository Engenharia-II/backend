import PasswordHash from '@/application/security/bcrypt';
import { USER_DEFAULT_ROLE_ID } from '@/infrastructure/config/constants';
import userRepository from '@/infrastructure/repositories/user.repository';
import { AppError } from '@/infrastructure/webserver/app-error';

export const signUp = async (name: string, email: string, password: string) => {
  try {
    password = await PasswordHash.hash(password);
    return userRepository.save({
      name,
      email,
      password,
      googleId: null,
      roleId: USER_DEFAULT_ROLE_ID
    });
  } catch (error) {
    throw new AppError(error as string, 400);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const isPasswordValid = await PasswordHash.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Erro ao realizar login', 500);
  }
};
