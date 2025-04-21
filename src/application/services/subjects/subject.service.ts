import { SubjectInterface } from '@/domain/interfaces/subjects.interface';
import subjectRepository from '@/infrastructure/repositories/subject.repository';

export const createSubject = async ({
  name,
  description
}: SubjectInterface) => {
  try {
    const subject = await subjectRepository.save({ name, description });
    return subject;
  } catch (error) {
    throw error;
  }
};
