import type { FastifyRequest, FastifyReply } from 'fastify';

export async function requestContext(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  // Attach request-scoped context (e.g., request ID, timestamp)
  request.headers['x-request-id'] = request.headers['x-request-id'] ?? crypto.randomUUID();
}
