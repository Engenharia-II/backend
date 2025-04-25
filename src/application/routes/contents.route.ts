import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { ContentController } from '../controllers/contents/content.controller';
import {
  contentIdSchema,
  contentSchema
} from '@/domain/validations/content.validation';

class ContentsRoute {
  public prefix_route = '/contents';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post(
      '/create',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: contentSchema
        }
      },
      ContentController.create
    );

    fastifyWithZod.get(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: contentIdSchema
        }
      },
      ContentController.getById
    );

    fastifyWithZod.get(
      '/',
      {
        preHandler: fastify.authenticate
      },
      ContentController.list
    );

    fastifyWithZod.put(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: contentIdSchema,
          body: contentSchema
        }
      },
      ContentController.update
    );

    fastifyWithZod.delete(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: contentIdSchema
        }
      },
      ContentController.delete
    );
  }
}

export default ContentsRoute;
