import { DomainEvent } from '../../../../shared/domain/domain-event.js';

export class LogsMinimizedEvent implements DomainEvent {
  readonly type = 'LOGS_MINIMIZED' as const;
  readonly occurredAt = Date.now();
  constructor(readonly payload: { scope: string; entriesRemoved: number }) {}
  toJSON() { return { type: this.type, occurredAt: this.occurredAt, payload: this.payload }; }
}
