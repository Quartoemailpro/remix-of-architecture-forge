import { getEnv } from './env.js';

export function getAppConfig() {
  const env = getEnv();
  return {
    port: env.PORT,
    host: env.HOST,
    logLevel: env.LOG_LEVEL,
    isProduction: env.NODE_ENV === 'production',
    isDevelopment: env.NODE_ENV === 'development',
    isTest: env.NODE_ENV === 'test',
  };
}
