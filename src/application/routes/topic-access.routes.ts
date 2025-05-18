import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import TopicAccessController from '../controllers/topic-access/topic-access.controller';
import { idTopicSchema } from '@/domain/validations/topic.validation';

class TopicAccessRoute {
  public prefix_route = '/topic-access';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.get(
      '/',
      {
        preHandler: fastify.authenticate
      },
      TopicAccessController.listLastUserTopicAccess
    );

    fastifyWithZod.put(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idTopicSchema
        }
      },
      TopicAccessController.updateLastTopicAccess
    );
  }
}

export default TopicAccessRoute;
