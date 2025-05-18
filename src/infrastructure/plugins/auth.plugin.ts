import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyPlugin from 'fastify-plugin';
import config from '@/infrastructure/config/constants';
import { AppError } from '../webserver/app-error';

export default fastifyPlugin(
  async (fastify) => {
    fastify.register(fastifyCookie, {
      secret: config.cookie.secret
    });
    fastify.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || config.jwt.secret,
      cookie: {
        cookieName: process.env.COOKIE_NAME || config.cookie.cookieName,
        signed: false
      }
    });

    fastify.decorate(
      'authenticate',
      async function (
        this: FastifyInstance,
        req: FastifyRequest,
        reply: FastifyReply
      ) {
        try {
          const decoded = await req.jwtVerify<{ id: string }>();
          req.user = { id: decoded.id };
        } catch (err) {
          reply.clearCookie(
            process.env.COOKIE_NAME || config.cookie.cookieName,
            {
              path: '/',
              secure: true,
              sameSite: true,
              httpOnly: true
            }
          );
          if (err instanceof Error) {
            throw new AppError(`Unauthorized, ${err.message}`, 401);
          }
          throw new AppError('Unauthorized', 401);
        }
      }
    );
  },
  {
    name: 'auth-middleware'
  }
);

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}
