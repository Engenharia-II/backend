import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import SubjectStudyController from '../controllers/subject-study/subject-study.controller';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  idSubjectSchema,
  subjectStudySchema
} from '@/domain/validations/subject.validation';

class SubjectStudyRoute {
  public prefix_route = '/subject-studies';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.get(
      '/',
      {
        preHandler: fastify.authenticate
      },
      SubjectStudyController.listByUser
    );

    fastifyWithZod.put(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: subjectStudySchema
        }
      },
      SubjectStudyController.updateSubjectStudy
    );

    fastifyWithZod.delete(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idSubjectSchema
        }
      },
      SubjectStudyController.removeSubjectStudy
    );
  }
}

export default SubjectStudyRoute;
