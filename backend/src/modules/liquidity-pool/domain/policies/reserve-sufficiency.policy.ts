import { LiquidityPool } from '../entities/liquidity-pool.entity.js';

export class ReserveSufficiencyPolicy {
  static assertSufficient(pool: LiquidityPool, amount: bigint): void {
    if (amount > pool.availableBalance) {
      throw new Error(`Insufficient liquidity: requested ${amount}, available ${pool.availableBalance}`);
    }
  }
}
