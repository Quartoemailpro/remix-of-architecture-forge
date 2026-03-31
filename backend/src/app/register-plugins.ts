import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import { getRateLimitConfig } from '../infra/config/rate-limit-config.js';
import { getAuthConfig } from '../infra/config/auth-config.js';
import { registerHttpMetrics } from '../infra/metrics/http-metrics.js';

export async function registerPlugins(app: FastifyInstance): Promise<void> {
  const rateLimitCfg = getRateLimitConfig();
  const authCfg = getAuthConfig();

  await app.register(cors, { origin: true });
  await app.register(helmet);
  await app.register(rateLimit, { max: rateLimitCfg.max, timeWindow: rateLimitCfg.windowMs });
  await app.register(jwt, { secret: authCfg.secret });

  registerHttpMetrics(app);
}
