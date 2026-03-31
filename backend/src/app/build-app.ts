import Fastify, { FastifyInstance } from 'fastify';
import { pinoLogger } from '../infra/logging/logger.js';
import { registerPlugins } from './register-plugins.js';
import { registerRoutes } from './register-routes.js';
import { registerModules } from './register-modules.js';
import { buildAppContext, AppContext } from './app-context.js';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: pinoLogger,
    requestIdHeader: 'x-request-id',
    genReqId: () => crypto.randomUUID(),
  });

  const context = buildAppContext();

  await registerPlugins(app);
  registerModules(context);
  await registerRoutes(app, context);

  return app;
}
