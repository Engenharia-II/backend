import { TopicStudyInterface } from '@/domain/interfaces/topic-study.interface';
import topicStudyRepository from '@/infrastructure/repositories/topic-study.repository';
import { getUserById } from '../user/user.service';
import { getTopicById } from '../topics/topic.service';

export const listTopicStudiesByUser = async (
  userId: string
): Promise<TopicStudyInterface[]> => {
  try {
    const topicStudies = await topicStudyRepository.listByUserId(userId);
    return topicStudies;
  } catch (error) {
    throw error;
  }
};

export const updateTopicStudy = async ({
  userId,
  topicId,
  finishedAt
}: TopicStudyInterface) => {
  try {
    await getUserById(userId);
    await getTopicById(topicId);
    await topicStudyRepository.update({ userId, topicId, finishedAt });
  } catch (error) {
    throw error;
  }
};

export const removeTopicStudy = async ({
  userId,
  topicId
}: TopicStudyInterface) => {
  try {
    await getUserById(userId);
    await getTopicById(topicId);
    await topicStudyRepository.delete({ userId, topicId });
  } catch (error) {
    throw error;
  }
};
