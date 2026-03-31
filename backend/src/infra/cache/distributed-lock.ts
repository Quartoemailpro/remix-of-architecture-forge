import { getRedis } from './redis.js';

export class DistributedLock {
  async acquire(key: string, ttlMs: number): Promise<boolean> {
    const result = await getRedis().set(`lock:${key}`, '1', 'PX', ttlMs, 'NX');
    return result === 'OK';
  }

  async release(key: string): Promise<void> {
    await getRedis().del(`lock:${key}`);
  }

  async withLock<T>(key: string, ttlMs: number, work: () => Promise<T>): Promise<T> {
    const acquired = await this.acquire(key, ttlMs);
    if (!acquired) throw new Error(`Failed to acquire lock: ${key}`);
    try {
      return await work();
    } finally {
      await this.release(key);
    }
  }
}
