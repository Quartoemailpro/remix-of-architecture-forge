import { ScheduledPayment } from '../entities/scheduled-payment.entity.js';

export interface PaymentSchedulerRepository {
  save(payment: ScheduledPayment): Promise<void>;
  findById(id: string): Promise<ScheduledPayment | null>;
  findReady(now: number): Promise<ScheduledPayment[]>;
  findByNamespace(namespace: string): Promise<ScheduledPayment[]>;
}
