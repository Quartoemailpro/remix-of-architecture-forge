import { LiquidityPool } from '../entities/liquidity-pool.entity.js';

export interface LiquidityPoolRepository {
  save(pool: LiquidityPool): Promise<void>;
  findById(id: string): Promise<LiquidityPool | null>;
  findDefault(): Promise<LiquidityPool | null>;
}
