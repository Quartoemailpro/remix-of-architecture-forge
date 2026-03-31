import { loadEnv } from './infra/config/env.js';
import { getAppConfig } from './infra/config/app-config.js';
import { buildApp } from './app/build-app.js';
import { closePool } from './infra/db/pg.js';
import { closeRedis } from './infra/cache/redis.js';

async function main(): Promise<void> {
  loadEnv();
  const config = getAppConfig();
  const app = await buildApp();

  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal}. Shutting down gracefully...`);
    await app.close();
    await closePool();
    await closeRedis();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  await app.listen({ port: config.port, host: config.host });
  app.log.info(`Server running on ${config.host}:${config.port}`);
}

main().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
