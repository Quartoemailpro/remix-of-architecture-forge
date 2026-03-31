import { PaymentSchedulerRepository } from '../../domain/repositories/payment-scheduler.repository.js';
import { ScheduledPayment } from '../../domain/entities/scheduled-payment.entity.js';
import { PaymentDelayPolicy } from '../../domain/policies/payment-delay.policy.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { PaymentScheduledEvent } from '../../domain/events/payment.events.js';

export class SchedulePaymentsUseCase {
  constructor(private readonly repository: PaymentSchedulerRepository, private readonly eventBus: EventBusPort) {}

  async execute(input: { id: string; namespace: string; amount: bigint; destinationAddress: string; minDelayMs: number; maxDelayMs: number; priority: number }): Promise<void> {
    const now = Date.now();
    const delay = PaymentDelayPolicy.calculateDelay(input.minDelayMs, input.maxDelayMs);
    const executeAfter = now + delay;
    const executeBefore = executeAfter + 3600000;

    PaymentDelayPolicy.assertValidWindow(executeAfter, executeBefore);

    const payment = ScheduledPayment.create({
      id: input.id, namespace: input.namespace, amount: input.amount, destinationAddress: input.destinationAddress,
      priority: input.priority, scheduledAt: now, executeAfter, executeBefore,
    });

    await this.repository.save(payment);
    this.eventBus.publish(new PaymentScheduledEvent({ paymentId: input.id, namespace: input.namespace, executeAfter }));
  }
}
