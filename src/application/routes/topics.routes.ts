import fastify, { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  topicIdSchema,
  topicSchema
} from '@/domain/validations/topic.validation';
import TopicController from '../controllers/topics/topic.controller';

class TopicsRoute {
  public prefix_route = '/topics';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post(
      '/create',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: topicSchema
        }
      },
      TopicController.create
    );

    fastifyWithZod.get(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: topicIdSchema
        }
      },
      TopicController.getById
    );

    fastifyWithZod.get(
      '/',
      {
        preHandler: fastify.authenticate
      },
      TopicController.list
    );

    fastifyWithZod.put(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: topicSchema,
          params: topicIdSchema
        }
      },
      TopicController.update
    );

    fastifyWithZod.delete(
      '/:id',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: topicIdSchema
        }
      },
      TopicController.delete
    );

    fastifyWithZod.get(
      '/:id/contents',
      {
        preHandler: fastify.authenticate,
        schema: {
          params: topicIdSchema
        }
      },
      TopicController.listContentsByTopic
    );
  }
}

export default TopicsRoute;
