import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import SubjectController from '../controllers/subjects/subjects.controller';
import { subjectSchema } from '@/domain/validations/subject.validation';

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
  }
}

export default SubjectsRoute;
