import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { idUserSchema } from '@/domain/validations/user.validation';
import { idSubjectSchema } from '@/domain/validations/subject.validation';
import SubjectAccessController from '../controllers/subject-access/subject-access.controller';

class SubjectAccessRoute {
  public prefix_route = '/subject-access';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.get(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: idUserSchema
        }
      },
      SubjectAccessController.listLastUserSubjectAccess
    );

    fastifyWithZod.put(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idSubjectSchema
        }
      },
      SubjectAccessController.updateLastSubjectAccess
    );
  }
}

export default SubjectAccessRoute;
