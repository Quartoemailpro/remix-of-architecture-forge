import { PaymentSchedulerRepository } from '../../domain/repositories/payment-scheduler.repository.js';

export class ReschedulePaymentUseCase {
  constructor(private readonly repository: PaymentSchedulerRepository) {}

  async execute(input: { paymentId: string; executeAfter: number; executeBefore: number }): Promise<void> {
    const payment = await this.repository.findById(input.paymentId);
    if (!payment) throw new Error('Payment not found');
    payment.reschedule(input.executeAfter, input.executeBefore);
    await this.repository.save(payment);
  }
}
