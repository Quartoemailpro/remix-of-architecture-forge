import { getRedis } from './redis.js';

export class RateLimitStore {
  async increment(key: string, windowMs: number): Promise<number> {
    const redis = getRedis();
    const fullKey = `ratelimit:${key}`;
    const count = await redis.incr(fullKey);
    if (count === 1) await redis.pexpire(fullKey, windowMs);
    return count;
  }

  async isExceeded(key: string, max: number, windowMs: number): Promise<boolean> {
    const count = await this.increment(key, windowMs);
    return count > max;
  }
}
