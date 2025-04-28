import { FastifyReply, FastifyRequest } from 'fastify';
import { SubjectStudyInterface } from '@/domain/interfaces/subject-study.interface';
import {
  listSubjectStudiesByUser,
  removeSubjectStudy,
  updateSubjectStudy
} from '@/application/services/subject-study/subject-study.service';

class SubjectStudyController {
  static async listByUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<SubjectStudyInterface[]> {
    try {
      const subjectStudies = await listSubjectStudiesByUser(request.user.id);
      return reply.status(200).send(subjectStudies);
    } catch (error) {
      throw error;
    }
  }

  static async updateSubjectStudy(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.user;
      const { subjectId, finishedAt } = request.body as {
        subjectId: string;
        finishedAt?: Date;
      };
      await updateSubjectStudy({ userId, subjectId, finishedAt });
      return reply
        .status(200)
        .send({ message: 'Estudo do assunto atualizado com sucesso' });
    } catch (error) {
      throw error;
    }
  }

  static async removeSubjectStudy(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id: userId } = request.user;
      const { subjectId } = request.body as { subjectId: string };
      await removeSubjectStudy({ userId, subjectId });
      return reply
        .status(200)
        .send({ message: 'Estudo do assunto removido com sucesso' });
    } catch (error) {
      throw error;
    }
  }
}

export default SubjectStudyController;
