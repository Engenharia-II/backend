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
