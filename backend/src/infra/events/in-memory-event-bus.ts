import { DomainEvent } from '../../shared/domain/domain-event.js';
import { EventBusPort } from '../../shared/application/ports/event-bus.port.js';

type Handler = (event: DomainEvent) => Promise<void>;

export class InMemoryEventBus implements EventBusPort {
  private handlers = new Map<string, Handler[]>();

  publish(event: DomainEvent): void {
    const list = this.handlers.get(event.type) ?? [];
    for (const handler of list) {
      handler(event).catch(err => console.error(`Event handler error for ${event.type}:`, err));
    }
  }

  publishAll(events: DomainEvent[]): void {
    for (const event of events) this.publish(event);
  }

  subscribe(eventType: string, handler: Handler): void {
    const list = this.handlers.get(eventType) ?? [];
    list.push(handler);
    this.handlers.set(eventType, list);
  }
}
