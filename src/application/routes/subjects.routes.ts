import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import SubjectController from '../controllers/subjects/subjects.controller';
import {
  subjectIdSchema,
  subjectSchema
} from '@/domain/validations/subject.validation';

class SubjectsRoute {
  public prefix_route = '/subjects';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post(
      '/create',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: subjectSchema
        }
      },
      SubjectController.create
    );

    fastifyWithZod.get(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: subjectIdSchema
        }
      },
      SubjectController.getById
    );

    fastifyWithZod.get(
      '/',
      {
        preHandler: fastify.authenticate
      },
      SubjectController.list
    );

    fastifyWithZod.put(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: subjectIdSchema,
          body: subjectSchema
        }
      },
      SubjectController.update
    );

    fastifyWithZod.delete(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: subjectIdSchema
        }
      },
      SubjectController.delete
    );

    fastify.get(
      '/:id/topics',
      {
        schema: {
          params: subjectIdSchema
        }
      },
      SubjectController.listTopicsBySubjectId
    );
  }
}

export default SubjectsRoute;
