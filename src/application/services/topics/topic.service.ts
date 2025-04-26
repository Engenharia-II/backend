import { TopicInterface } from '@/domain/interfaces/topics.interface';
import topicRepository from '@/infrastructure/repositories/topic.repository';
import { AppError } from '@/infrastructure/webserver/app-error';
import { getSubjectById } from '../subjects/subject.service';

export const createTopic = async ({
  name,
  description,
  position,
  subjectId
}: TopicInterface) => {
  try {
    await getSubjectById(subjectId as string);
    const topic = await topicRepository.save({
      name,
      description,
      position,
      subjectId
    });
    return topic;
  } catch (error) {
    throw error;
  }
};

export const getTopicById = async (id: string) => {
  try {
    const topic = await topicRepository.getById(id);
    if (!topic) {
      throw new AppError('Tópico não encontrado', 404);
    }
    return topic;
  } catch (error) {
    throw error;
  }
};

export const listTopics = async () => {
  try {
    const topics = await topicRepository.listAll();
    if (!topics) {
      throw new AppError('Nenhum tópico encontrado', 404);
    }
    return topics;
  } catch (error) {
    throw error;
  }
};

export const updateTopic = async ({
  id,
  name,
  description,
  position,
  subjectId
}: TopicInterface) => {
  try {
    const oldTopic = await getTopicById(id as string);
    if (oldTopic.subjectId !== subjectId) {
      throw new AppError('Você não pode alterar o assunto do tópico', 400);
    }
    const topic = await topicRepository.update({
      id,
      name,
      description,
      position,
      subjectId
    });
    return topic;
  } catch (error) {
    throw error;
  }
};

export const deleteTopic = async (id: string) => {
  try {
    await getTopicById(id);
    const topic = await topicRepository.delete(id);
    return topic;
  } catch (error) {
    throw error;
  }
};

export const listTopicsBySubject = async (
  subjectId: string
): Promise<TopicInterface[]> => {
  try {
    await getSubjectById(subjectId);
    const topics = await topicRepository.listBySubjectId(subjectId);
    return topics;
  } catch (error) {
    throw error;
  }
};
