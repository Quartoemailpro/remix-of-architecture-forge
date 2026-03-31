import type { FastifyInstance } from 'fastify';
import type { AppContext } from '../../../app/app-context.js';
import { adminAuth } from '../../../infra/auth/admin-auth.js';
import { metricsRegistry } from '../../../infra/metrics/prometheus.js';

export async function adminRoutes(app: FastifyInstance, context: AppContext): Promise<void> {
  app.addHook('onRequest', adminAuth);

  app.get('/sessions', async (request, reply) => {
    // TODO: list active sessions for admin dashboard
    return reply.send({ sessions: [], total: 0 });
  });

  app.post('/sessions/:id/revoke', async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: revoke session
    return reply.send({ status: 'revoked', sessionId: id });
  });

  app.get('/pool/status', async () => {
    // TODO: return liquidity pool status
    return { totalBalance: 0, availableBalance: 0, reservedBalance: 0 };
  });
}
