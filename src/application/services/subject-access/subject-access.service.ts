import subjectAccessRepository from '@/infrastructure/repositories/subject-access.repository';
import { getUserById } from '../user/user.service';
import { AppError } from '@/infrastructure/webserver/app-error';
import { getSubjectById } from '../subjects/subject.service';

export const listLastSubjectsAccessByUserId = async (userId: string) => {
  try {
    await getUserById(userId);
    const subjectsAccess =
      await subjectAccessRepository.listLastSubjectsAccess(userId);
    if (!subjectsAccess) {
      throw new AppError('Nenhum assunto encontrado', 404);
    }
    return subjectsAccess;
  } catch (error) {
    throw error;
  }
};

export const updateLastSubjectAccess = async (
  userId: string,
  subjectId: string
) => {
  try {
    await getUserById(userId);
    await getSubjectById(subjectId);
    await subjectAccessRepository.updateLastSubjectAccess(userId, subjectId);
  } catch (error) {
    throw error;
  }
};
