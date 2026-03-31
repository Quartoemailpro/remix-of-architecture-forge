import type { FastifyInstance } from 'fastify';

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health', async () => ({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
  }));

  app.get('/ready', async () => {
    // TODO: check db + redis connectivity
    return { status: 'ready' };
  });
}
