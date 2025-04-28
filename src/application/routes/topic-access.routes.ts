import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { idUserSchema } from '@/domain/validations/user.validation';
import TopicAccess from '../controllers/topic-access/topic-access.controller';
import { idTopicSchema } from '@/domain/validations/topic.validation';

class TopicAccessRoute {
  public prefix_route = '/topic-access';

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
      TopicAccess.listLastUserTopicAccess
    );

    fastifyWithZod.put(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idTopicSchema
        }
      },
      TopicAccess.updateLastTopicAccess
    );
  }
}

export default TopicAccessRoute;
