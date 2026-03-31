import { EventBusPort } from '../../shared/application/ports/event-bus.port.js';
import { DomainEvent } from '../../shared/domain/domain-event.js';

export class FakeEventBus implements EventBusPort {
  readonly published: DomainEvent[] = [];
  private handlers = new Map<string, ((event: DomainEvent) => Promise<void>)[]>();

  publish(event: DomainEvent): void { this.published.push(event); }
  publishAll(events: DomainEvent[]): void { events.forEach(e => this.publish(e)); }
  subscribe(type: string, handler: (event: DomainEvent) => Promise<void>): void {
    const list = this.handlers.get(type) ?? [];
    list.push(handler);
    this.handlers.set(type, list);
  }
  clear(): void { this.published.length = 0; }
}
