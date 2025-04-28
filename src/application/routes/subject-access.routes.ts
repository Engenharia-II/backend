import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { idUserSchema } from '@/domain/validations/user.validation';
import { idSubjectSchema } from '@/domain/validations/subject.validation';
import SubjectAccess from '../controllers/subject-access/subject-access.controller';

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
      SubjectAccess.listLastUserSubjectAccess
    );

    fastifyWithZod.put(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idSubjectSchema
        }
      },
      SubjectAccess.updateLastSubjectAccess
    );
  }
}

export default SubjectAccessRoute;
