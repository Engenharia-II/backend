import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { idContentSchema } from '@/domain/validations/content.validation';
import SavedContentController from '../controllers/saved-content/saved-content.controller';

class SavedContentRoute {
  public prefix_route = '/saved-content';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post(
      '/save',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idContentSchema
        }
      },
      SavedContentController.saveContent
    );

    fastifyWithZod.delete(
      '/remove',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idContentSchema
        }
      },
      SavedContentController.removeSavedContent
    );

    fastifyWithZod.get(
      '/by-user-id',
      {
        preHandler: fastify.authenticate
      },
      SavedContentController.listSavedContentsByUserId
    );
  }
}

export default SavedContentRoute;
