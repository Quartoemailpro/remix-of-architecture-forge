import Redis from 'ioredis';
import { getRedisConfig } from '../config/redis-config.js';

let redis: Redis | null = null;

export function getRedis(): Redis {
  if (!redis) {
    const config = getRedisConfig();
    redis = new Redis(config.url, { keyPrefix: config.keyPrefix });
  }
  return redis;
}

export async function closeRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}
