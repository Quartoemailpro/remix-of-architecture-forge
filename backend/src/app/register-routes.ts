import type { FastifyInstance } from 'fastify';
import type { AppContext } from './app-context.js';
import { healthRoutes } from '../api/http/routes/health.routes.js';
import { mixSessionRoutes } from '../api/http/routes/mix-session.routes.js';
import { pricingRoutes } from '../api/http/routes/pricing.routes.js';
import { contactRoutes } from '../api/http/routes/contact.routes.js';
import { adminRoutes } from '../api/http/routes/admin.routes.js';
import { metricsRoutes } from '../api/http/routes/metrics.routes.js';

export async function registerRoutes(app: FastifyInstance, context: AppContext): Promise<void> {
  await app.register(healthRoutes, { prefix: '/api' });
  await app.register((instance) => mixSessionRoutes(instance, context), { prefix: '/api/mix' });
  await app.register(pricingRoutes, { prefix: '/api/pricing' });
  await app.register(contactRoutes, { prefix: '/api/contact' });
  await app.register((instance) => adminRoutes(instance, context), { prefix: '/api/admin' });
  await app.register(metricsRoutes, { prefix: '/internal' });
}
