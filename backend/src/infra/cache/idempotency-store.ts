import { getRedis } from './redis.js';
import { IdempotencyStorePort } from '../../shared/application/ports/idempotency-store.port.js';

export class RedisIdempotencyStore implements IdempotencyStorePort {
  async exists(key: string): Promise<boolean> {
    const result = await getRedis().get(`idempotency:${key}`);
    return result !== null;
  }

  async set(key: string, ttlMs: number): Promise<void> {
    await getRedis().set(`idempotency:${key}`, '1', 'PX', ttlMs);
  }
}
