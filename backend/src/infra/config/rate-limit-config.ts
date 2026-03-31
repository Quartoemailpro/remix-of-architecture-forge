import { getEnv } from './env.js';

export function getRateLimitConfig() {
  const env = getEnv();
  return { max: env.RATE_LIMIT_MAX, windowMs: env.RATE_LIMIT_WINDOW_MS };
}
