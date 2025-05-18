import { SubjectInterface } from '@/domain/interfaces/subjects.interface';
import { TopicInterface } from '@/domain/interfaces/topics.interface';
import subjectRepository from '@/infrastructure/repositories/subject.repository';
import { AppError } from '@/infrastructure/webserver/app-error';

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

export const getSubjectById = async (id: string) => {
  try {
    const subject = await subjectRepository.getById(id);
    if (!subject) {
      throw new AppError('Matéria não encontrada', 404);
    }
    return subject;
  } catch (error) {
    throw error;
  }
};

export const getSubjectDetailsById = async (id: string, userId: string) => {
  try {
    const raw = await subjectRepository.getDetailsById(id, userId);
    if (!raw) {
      throw new AppError('Matéria não encontrada', 404);
    }
    return {
      id: raw.subject_id,
      name: raw.name,
      description: raw.description,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      topics: raw.topics.map((t: TopicInterface) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        position: t.position,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        contentCount: t.contentCount,
        duration: t.duration,
        completed: t.completed
      })),
      totalTopics: Number(raw.total_topics),
      completedTopics: Number(raw.completed_topics),
      subjectProgress: Number(raw.subject_progress),
      subjectDuration: Number(raw.subject_duration)
    };
  } catch (error) {
    throw error;
  }
};

export const listSubjects = async () => {
  try {
    const subjects = await subjectRepository.listAll();
    if (!subjects) {
      throw new AppError('Nenhuma matéria encontrada', 404);
    }
    return subjects;
  } catch (error) {
    throw error;
  }
};

export const updateSubject = async ({
  id,
  name,
  description
}: SubjectInterface) => {
  try {
    await getSubjectById(id as string);
    const subject = await subjectRepository.update({
      id,
      name,
      description
    });
    return subject;
  } catch (error) {
    throw error;
  }
};

export const deleteSubject = async (id: string) => {
  try {
    await getSubjectById(id);
    const subject = await subjectRepository.delete(id);
    return subject;
  } catch (error) {
    throw error;
  }
};

export const listSubjectsWithProgress = async (userId: string) => {
  try {
    const subjects = await subjectRepository.listAllWithProgress(userId);
    if (!subjects) {
      throw new AppError('Nenhuma matéria encontrada', 404);
    }
    return subjects.map((r) => {
      const total = Number(r.total_topics);
      const done = Number(r.completed_topics);

      return {
        subjectId: r.subject_id,
        name: r.name,
        totalTopics: total,
        completedTopics: done,
        progress: total > 0 ? parseFloat((done / total).toFixed(4)) : 0,
        status: r.study_status || null
      };
    });
  } catch (error) {
    throw error;
  }
};
