import {
  listLastSubjectsAccessByUserId,
  updateLastSubjectAccess
} from '@/application/services/subject-access/subject-access.service';
import { FastifyReply, FastifyRequest } from 'fastify';

class SubjectAccessController {
  static async listLastUserSubjectAccess(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.user;
      const subjects = await listLastSubjectsAccessByUserId(userId);
      return reply.status(200).send(subjects);
    } catch (error) {
      throw error;
    }
  }

  static async updateLastSubjectAccess(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.user;
      const { subjectId } = request.body as { subjectId: string };
      await updateLastSubjectAccess(userId, subjectId);
      return reply
        .status(200)
        .send({ message: 'Último acesso atualizado com sucesso' });
    } catch (error) {
      throw error;
    }
  }
}

export default SubjectAccessController;
