import { getEnv } from './env.js';

export function getFeatureFlags() {
  const env = getEnv();
  return {
    enableAdminApi: env.FF_ENABLE_ADMIN_API,
    enableMetrics: env.FF_ENABLE_METRICS,
  };
}
