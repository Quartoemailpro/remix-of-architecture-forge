import type { FastifyInstance } from 'fastify';
import { contactSchema } from '../schemas/contact.schema.js';

export async function contactRoutes(app: FastifyInstance): Promise<void> {
  app.post('/', async (request, reply) => {
    const body = contactSchema.parse(request.body);
    // TODO: persist contact ticket
    return reply.code(201).send({ status: 'received', ticketId: crypto.randomUUID() });
  });
}
