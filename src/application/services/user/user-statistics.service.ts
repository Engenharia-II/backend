import { UserStatisticsInterface } from '@/domain/interfaces/user-statistics.interface';
import userRepository from '@/infrastructure/repositories/user.repository';

export const getUserStatistics = async (
  userId: string
): Promise<UserStatisticsInterface> => {
  try {
    const userStatistics = await userRepository.getUserStatistics(userId);
    return userStatistics;
  } catch (error) {
    throw error;
  }
};
