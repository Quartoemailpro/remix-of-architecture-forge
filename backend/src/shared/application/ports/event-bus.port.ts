import { DomainEvent } from '../../shared/domain/domain-event.js';

export interface EventBusPort {
  publish(event: DomainEvent): void;
  publishAll(events: DomainEvent[]): void;
  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void;
}
