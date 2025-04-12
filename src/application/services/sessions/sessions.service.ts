import PasswordHash from '@/application/security/bcrypt';
import { USER_DEFAULT_ROLE_ID } from '@/infrastructure/config/constants';
import userRepository from '@/infrastructure/repositories/user.repository';

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
    throw new Error(error as string);
  }
};
