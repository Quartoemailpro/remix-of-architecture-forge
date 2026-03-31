// Event handler registration — wire domain event handlers here
import { EventBusPort } from '../../shared/application/ports/event-bus.port.js';

export function registerEventHandlers(eventBus: EventBusPort): void {
  // Example:
  // eventBus.subscribe('DEPOSIT_DETECTED', async (event) => { ... });
  // eventBus.subscribe('DEPOSIT_CONFIRMED', async (event) => { ... });
  // eventBus.subscribe('ADDRESS_GENERATED', async (event) => { ... });
  // eventBus.subscribe('PAYMENT_SCHEDULED', async (event) => { ... });
}
