import type { FastifyInstance } from 'fastify';
import type { AppContext } from '../../../app/app-context.js';
import { createMixSessionSchema } from '../schemas/mix-session.schema.js';
import { MixSessionPresenter } from '../presenters/mix-session.presenter.js';

export async function mixSessionRoutes(app: FastifyInstance, context: AppContext): Promise<void> {
  app.post('/session', async (request, reply) => {
    const body = createMixSessionSchema.parse(request.body);

    // Orchestrate via use cases
    // 1. Generate address
    // 2. Start deposit saga
    // Return safe session response

    return reply.code(201).send(
      MixSessionPresenter.toResponse({
        sessionId: context.uuid.generate(),
        depositAddress: 'pending',
        status: 'initiated',
        createdAt: context.clock.now(),
      })
    );
  });

  app.get('/session/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: query session status
    return reply.send({ sessionId: id, status: 'unknown' });
  });
}
