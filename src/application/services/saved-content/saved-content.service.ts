import { SavedContentInterface } from '@/domain/interfaces/saved-content.interface';
import SavedContentRepository from '@/infrastructure/repositories/saved-content.repository';
import { getUserById } from '../user/user.service';
import { getContentById } from '../contents/content.service';

export const saveContent = async (
  userId: string,
  contentId: string
): Promise<SavedContentInterface> => {
  try {
    await getUserById(userId);
    await getContentById(contentId);
    const savedContent = await SavedContentRepository.save(userId, contentId);
    return savedContent;
  } catch (error) {
    throw error;
  }
};

export const removeSavedContent = async (userId: string, contentId: string) => {
  try {
    await getUserById(userId);
    await getContentById(contentId);
    await SavedContentRepository.delete(userId, contentId);
  } catch (error) {
    throw error;
  }
};

export const listSavedContentsByUserId = async (
  userId: string
): Promise<SavedContentInterface[]> => {
  try {
    await getUserById(userId);
    const savedContent = await SavedContentRepository.listSavedContent(userId);
    return savedContent;
  } catch (error) {
    throw error;
  }
};
