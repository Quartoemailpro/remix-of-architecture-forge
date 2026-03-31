import { PaymentSchedulerRepository } from '../../domain/repositories/payment-scheduler.repository.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { PaymentReleasedEvent, PaymentFailedEvent } from '../../domain/events/payment.events.js';

export class ReleaseScheduledPaymentUseCase {
  constructor(private readonly repository: PaymentSchedulerRepository, private readonly eventBus: EventBusPort) {}

  async execute(paymentId: string): Promise<void> {
    const payment = await this.repository.findById(paymentId);
    if (!payment) throw new Error('Payment not found');

    const now = Date.now();
    if (!payment.isReadyToExecute(now)) throw new Error('Payment is not ready for execution');

    payment.markExecuting();
    // Actual blockchain disbursement would happen here
    payment.complete(now);
    await this.repository.save(payment);

    this.eventBus.publish(new PaymentReleasedEvent({ paymentId, namespace: payment.namespace }));
  }
}
