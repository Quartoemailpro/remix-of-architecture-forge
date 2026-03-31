import { getEnv } from './env.js';

export function getDbConfig() {
  const env = getEnv();
  return {
    connectionString: env.DATABASE_URL,
    poolMin: env.DB_POOL_MIN,
    poolMax: env.DB_POOL_MAX,
  };
}
