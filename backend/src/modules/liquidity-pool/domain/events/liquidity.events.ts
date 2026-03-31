import { DomainEvent } from '../../../../shared/domain/domain-event.js';

export class LiquidityReservedEvent implements DomainEvent {
  readonly type = 'LIQUIDITY_RESERVED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { poolId: string; reservationId: string; amount: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}

export class LiquidityReleasedEvent implements DomainEvent {
  readonly type = 'LIQUIDITY_RELEASED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { poolId: string; reservationId: string; amount: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}
