import { LiquidityPoolRepository } from '../../domain/repositories/liquidity-pool.repository.js';
import { ReserveSufficiencyPolicy } from '../../domain/policies/reserve-sufficiency.policy.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { LiquidityReservedEvent } from '../../domain/events/liquidity.events.js';

export class ReserveLiquidityUseCase {
  constructor(private readonly repository: LiquidityPoolRepository, private readonly eventBus: EventBusPort) {}

  async execute(input: { poolId: string; reservationId: string; amount: bigint }): Promise<void> {
    const pool = await this.repository.findById(input.poolId);
    if (!pool) throw new Error('Pool not found');

    ReserveSufficiencyPolicy.assertSufficient(pool, input.amount);
    pool.reserve(input.amount, Date.now());
    await this.repository.save(pool);

    this.eventBus.publish(new LiquidityReservedEvent({
      poolId: input.poolId, reservationId: input.reservationId, amount: input.amount.toString(),
    }));
  }
}
