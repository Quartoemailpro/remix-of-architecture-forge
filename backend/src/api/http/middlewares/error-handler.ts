import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { DomainError } from '../../../shared/domain/domain-error.js';

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.code(400).send({
        error: 'Validation Error',
        details: error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      });
    }

    if (error instanceof DomainError) {
      return reply.code(422).send({ error: error.code, message: error.message });
    }

    request.log.error(error, 'Unhandled error');
    return reply.code(500).send({ error: 'Internal Server Error' });
  });
}
