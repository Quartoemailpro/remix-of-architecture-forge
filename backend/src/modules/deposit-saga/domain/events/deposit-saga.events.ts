import { DomainEvent } from '../../../../shared/domain/domain-event.js';

export class DepositSagaStartedEvent implements DomainEvent {
  readonly type = 'DEPOSIT_SAGA_STARTED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { sagaId: string; namespace: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}

export class DepositAcceptedEvent implements DomainEvent {
  readonly type = 'DEPOSIT_ACCEPTED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { sagaId: string; namespace: string; step: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}

export class DepositRoutedEvent implements DomainEvent {
  readonly type = 'DEPOSIT_ROUTED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { sagaId: string; namespace: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}

export class DepositSagaFailedEvent implements DomainEvent {
  readonly type = 'DEPOSIT_SAGA_FAILED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { sagaId: string; namespace: string; reason: string }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}
