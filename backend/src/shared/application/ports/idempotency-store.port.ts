export interface IdempotencyStorePort {
  exists(key: string): Promise<boolean>;
  set(key: string, ttlMs: number): Promise<void>;
}
