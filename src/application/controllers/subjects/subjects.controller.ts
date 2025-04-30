import { FastifyReply, FastifyRequest } from 'fastify';
import { checkIFUserIsAdmin } from '@/application/services/user/user.service';
import { SubjectInterface } from '@/domain/interfaces/subjects.interface';
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  listSubjects,
  updateSubject,
  listSubjectsWithProgress
} from '@/application/services/subjects/subject.service';
import { TopicInterface } from '@/domain/interfaces/topics.interface';
import { listTopicsBySubject } from '@/application/services/topics/topic.service';

class SubjectController {
  static async create(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<SubjectInterface> {
    try {
      const { name, description } = request.body as SubjectInterface;
      await checkIFUserIsAdmin(request.user.id);
      const subject = await createSubject({ name, description });
      return reply.status(201).send({
        message: 'Matéria criada com sucesso',
        subject
      });
    } catch (error) {
      throw error;
    }
  }

  static async getById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<SubjectInterface> {
    try {
      const { id } = request.params as { id: string };
      const subject = await getSubjectById(id);
      return reply.status(200).send(subject);
    } catch (error) {
      throw error;
    }
  }

  static async list(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<SubjectInterface[]> {
    try {
      const subjects = await listSubjects();
      return reply.status(200).send(subjects);
    } catch (error) {
      throw error;
    }
  }

  static async update(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<SubjectInterface> {
    try {
      const { id } = request.params as { id: string };
      const { name, description } = request.body as SubjectInterface;
      await checkIFUserIsAdmin(request.user.id);
      const subject = await updateSubject({ id, name, description });
      return reply.status(200).send({
        message: 'Matéria atualizada com sucesso',
        subject
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<{ message: string }> {
    try {
      const { id } = request.params as { id: string };
      await checkIFUserIsAdmin(request.user.id);
      const subject = await deleteSubject(id);
      return reply.status(200).send({
        message: 'Matéria deletada com sucesso',
        subject
      });
    } catch (error) {
      throw error;
    }
  }

  static async listTopicsBySubjectId(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<TopicInterface[]> {
    try {
      const { id: subjectId } = request.params as { id: string };
      const topics = await listTopicsBySubject(subjectId);
      return reply.status(200).send(topics);
    } catch (error) {
      throw error;
    }
  }

  static async listAllWithProgress(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<SubjectInterface[]> {
    try {
      const { id: userId } = request.user;
      const subjects = await listSubjectsWithProgress(userId);
      return reply.status(200).send(subjects);
    } catch (error) {
      throw error;
    }
  }
}

export default SubjectController;
