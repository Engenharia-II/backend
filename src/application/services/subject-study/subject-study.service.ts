import { SubjectStudyInterface } from '@/domain/interfaces/subject-study.interface';
import subjectStudyRepository from '@/infrastructure/repositories/subject-study.repository';
import { getUserById } from '../user/user.service';
import { getSubjectById } from '../subjects/subject.service';

export const listSubjectStudiesByUser = async (
  userId: string
): Promise<SubjectStudyInterface[]> => {
  try {
    const subjectStudies = await subjectStudyRepository.listByUserId(userId);
    return subjectStudies;
  } catch (error) {
    throw error;
  }
};

export const updateSubjectStudy = async ({
  userId,
  subjectId,
  finishedAt
}: SubjectStudyInterface) => {
  try {
    await getUserById(userId);
    await getSubjectById(subjectId);
    await subjectStudyRepository.update({ userId, subjectId, finishedAt });
  } catch (error) {
    throw error;
  }
};

export const removeSubjectStudy = async ({
  userId,
  subjectId
}: SubjectStudyInterface) => {
  try {
    await getUserById(userId);
    await getSubjectById(subjectId);
    await subjectStudyRepository.delete({ userId, subjectId });
  } catch (error) {
    throw error;
  }
};
