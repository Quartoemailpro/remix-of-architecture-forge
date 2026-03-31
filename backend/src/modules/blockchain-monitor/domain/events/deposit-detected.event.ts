import { DomainEvent } from '../../../../shared/domain/domain-event.js';

export class DepositDetectedEvent implements DomainEvent {
  readonly type = 'DEPOSIT_DETECTED' as const;
  readonly occurredAt: number;

  constructor(readonly payload: { txid: string; namespace: string; amount: bigint | null; detectedAt: number }) {
    this.occurredAt = Date.now();
  }

  toJSON(): Record<string, unknown> {
    return { type: this.type, occurredAt: this.occurredAt, payload: { ...this.payload, amount: this.payload.amount?.toString() } };
  }
}
