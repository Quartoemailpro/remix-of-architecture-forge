import { LiquidityPoolRepository } from '../../domain/repositories/liquidity-pool.repository.js';

export class ReconcilePoolUseCase {
  constructor(private readonly repository: LiquidityPoolRepository) {}

  async execute(poolId: string): Promise<{ totalBalance: string; availableBalance: string; reservedBalance: string }> {
    const pool = await this.repository.findById(poolId);
    if (!pool) throw new Error('Pool not found');

    // Invariant: total = available + reserved
    const expectedTotal = pool.availableBalance + pool.reservedBalance;
    if (expectedTotal !== pool.totalBalance) {
      throw new Error(`Pool reconciliation failed: total=${pool.totalBalance}, available+reserved=${expectedTotal}`);
    }

    return {
      totalBalance: pool.totalBalance.toString(),
      availableBalance: pool.availableBalance.toString(),
      reservedBalance: pool.reservedBalance.toString(),
    };
  }
}
