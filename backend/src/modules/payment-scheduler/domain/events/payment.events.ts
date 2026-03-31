import { DomainEvent } from '../../../../shared/domain/domain-event.js';

export class PaymentScheduledEvent implements DomainEvent {
  readonly type = 'PAYMENT_SCHEDULED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { paymentId: string; namespace: string; executeAfter: number }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}

export class PaymentReleasedEvent implements DomainEvent {
  readonly type = 'PAYMENT_RELEASED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { paymentId: string; namespace: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}

export class PaymentFailedEvent implements DomainEvent {
  readonly type = 'PAYMENT_FAILED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { paymentId: string; namespace: string; reason: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}
