import { DomainEvent } from '../../../../shared/domain/domain-event.js';

export class DepositConfirmedEvent implements DomainEvent {
  readonly type = 'DEPOSIT_CONFIRMED' as const;
  readonly occurredAt: number;

  constructor(readonly payload: { txid: string; namespace: string; confirmations: number; confirmedAt: number }) {
    this.occurredAt = Date.now();
  }

  toJSON(): Record<string, unknown> {
    return { type: this.type, occurredAt: this.occurredAt, payload: this.payload };
  }
}
