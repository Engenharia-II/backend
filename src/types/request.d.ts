import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string;
    };
    user: {
      id: string;
    };
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
    };
  }
}

type VerifyPayloadType = {
  id: string;
};
