import { FastifyReply, FastifyRequest } from 'fastify';
import { checkIFUserIsAdmin } from '@/application/services/user/user.service';
import { SubjectInterface } from '@/domain/interfaces/subjects.interface';
import {
  createSubject,
  getSubjectById,
  listSubjects,
  updateSubject
} from '@/application/services/subjects/subject.service';

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
}

export default SubjectController;
