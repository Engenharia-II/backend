import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import TopicStudyController from '../controllers/topic-study/topic-study.controller';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  idTopicSchema,
  topicStudySchema
} from '@/domain/validations/topic.validation';

class TopicStudyRoute {
  public prefix_route = '/topic-studies';

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.get(
      '/',
      {
        preHandler: fastify.authenticate
      },
      TopicStudyController.listByUser
    );

    fastifyWithZod.put(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: topicStudySchema
        }
      },
      TopicStudyController.updateTopicStudy
    );

    fastifyWithZod.delete(
      '/',
      {
        preHandler: fastify.authenticate,
        schema: {
          body: idTopicSchema
        }
      },
      TopicStudyController.removeTopicStudy
    );
  }
}

export default TopicStudyRoute;
