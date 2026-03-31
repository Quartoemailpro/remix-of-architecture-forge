import type { FastifyInstance } from 'fastify';
import { metricsRegistry } from '../../../infra/metrics/prometheus.js';

export async function metricsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/metrics', async (request, reply) => {
    const metrics = await metricsRegistry.metrics();
    reply.header('Content-Type', metricsRegistry.contentType);
    return reply.send(metrics);
  });
}
