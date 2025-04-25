import { ContentInterface } from '@/domain/interfaces/contents.interface';
import contentRepository from '@/infrastructure/repositories/content.repository';
import { getTopicById } from '../topics/topic.service';
import { AppError } from '@/infrastructure/webserver/app-error';

export const createContent = async ({
  name,
  description,
  duration,
  isFree,
  publicationDate,
  topicId,
  type,
  url,
  tumbnailUrl
}: ContentInterface) => {
  try {
    await getTopicById(topicId);
    const content = await contentRepository.save({
      name,
      description,
      duration,
      isFree,
      publicationDate,
      topicId,
      type,
      url,
      tumbnailUrl
    });
    return content;
  } catch (error) {
    throw error;
  }
};

export const getContentById = async (id: string) => {
  try {
    const content = await contentRepository.getById(id);
    if (!content) {
      throw new AppError('Conteúdo não encontrado', 404);
    }
    return content;
  } catch (error) {
    throw error;
  }
};

export const listContents = async () => {
  try {
    const contents = await contentRepository.listAll();
    if (!contents) {
      throw new AppError('Nenhum conteúdo encontrado', 404);
    }
    return contents;
  } catch (error) {
    throw error;
  }
};

export async function updateContent({
  id,
  name,
  description,
  duration,
  isFree,
  publicationDate,
  topicId,
  type,
  url,
  tumbnailUrl
}: ContentInterface) {
  try {
    const oldContent = await getContentById(id as string);

    if (oldContent.topicId !== topicId) {
      throw new AppError('Não é possível alterar o tópico do conteúdo', 400);
    }

    const content = await contentRepository.update({
      id,
      name,
      description,
      duration,
      isFree,
      publicationDate,
      topicId,
      type,
      url,
      tumbnailUrl
    });
    return content;
  } catch (error) {
    throw error;
  }
}

export const deleteContent = async (id: string) => {
  try {
    await getContentById(id);
    const content = await contentRepository.delete(id);
    return content;
  } catch (error) {
    throw error;
  }
};
