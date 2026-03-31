export class AddressExpiration {
  private constructor(
    private readonly expiresAtMs: number,
    private readonly ttlMs: number
  ) {}

  static fromTTL(ttlMs: number, now: number = Date.now()): AddressExpiration {
    if (ttlMs <= 0) {
      throw new Error('TTL must be a positive number of milliseconds.');
    }
    if (ttlMs > 7 * 24 * 60 * 60 * 1000) {
      throw new Error('TTL cannot exceed 7 days.');
    }
    return new AddressExpiration(now + ttlMs, ttlMs);
  }

  static fromTimestamp(expiresAtMs: number, ttlMs: number): AddressExpiration {
    return new AddressExpiration(expiresAtMs, ttlMs);
  }

  isExpired(now: number = Date.now()): boolean {
    return now >= this.expiresAtMs;
  }

  getExpiresAt(): number {
    return this.expiresAtMs;
  }

  getTTL(): number {
    return this.ttlMs;
  }

  remainingMs(now: number = Date.now()): number {
    return Math.max(0, this.expiresAtMs - now);
  }
}
