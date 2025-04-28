import { getUserById } from '../user/user.service';
import { AppError } from '@/infrastructure/webserver/app-error';
import topicAccessRepository from '@/infrastructure/repositories/topic-access.repository';
import { getTopicById } from '../topics/topic.service';

export const listLastTopicsAccessByUserId = async (userId: string) => {
  try {
    await getUserById(userId);
    const topicsAccess =
      await topicAccessRepository.listLastTopicsAccess(userId);
    if (!topicsAccess) {
      throw new AppError('Nenhum assunto encontrado', 404);
    }
    return topicsAccess;
  } catch (error) {
    throw error;
  }
};

export const updateLastTopicAccess = async (
  userId: string,
  topicId: string
) => {
  try {
    await getUserById(userId);
    await getTopicById(topicId);
    await topicAccessRepository.updateLastTopicAccess(userId, topicId);
  } catch (error) {
    throw error;
  }
};
