import { AggregateRoot } from '../../../../shared/domain/aggregate-root.js';

export type PaymentStatus = 'scheduled' | 'executing' | 'completed' | 'failed';

export interface ScheduledPaymentProps {
  id: string; namespace: string; amount: bigint; destinationAddress: string;
  status: PaymentStatus; priority: number; scheduledAt: number;
  executeAfter: number; executeBefore: number;
  executedAt: number | null; failedAt: number | null; failureReason: string | null;
}

export class ScheduledPayment extends AggregateRoot<string> {
  private props: Omit<ScheduledPaymentProps, 'id'>;

  private constructor(p: ScheduledPaymentProps) {
    super(p.id);
    const { id: _, ...rest } = p;
    this.props = rest;
  }

  static create(p: Omit<ScheduledPaymentProps, 'status' | 'executedAt' | 'failedAt' | 'failureReason'>): ScheduledPayment {
    return new ScheduledPayment({ ...p, status: 'scheduled', executedAt: null, failedAt: null, failureReason: null });
  }

  static reconstitute(p: ScheduledPaymentProps): ScheduledPayment { return new ScheduledPayment(p); }

  get namespace(): string { return this.props.namespace; }
  get amount(): bigint { return this.props.amount; }
  get status(): PaymentStatus { return this.props.status; }
  get priority(): number { return this.props.priority; }
  get executeAfter(): number { return this.props.executeAfter; }
  get executeBefore(): number { return this.props.executeBefore; }

  isReadyToExecute(now: number): boolean {
    return this.props.status === 'scheduled' && now >= this.props.executeAfter && now <= this.props.executeBefore;
  }

  markExecuting(): void { this.props.status = 'executing'; }
  complete(now: number): void { this.props.status = 'completed'; this.props.executedAt = now; }
  fail(reason: string, now: number): void { this.props.status = 'failed'; this.props.failedAt = now; this.props.failureReason = reason; }
  reschedule(executeAfter: number, executeBefore: number): void {
    if (this.props.status !== 'failed') throw new Error('Can only reschedule failed payments');
    this.props.status = 'scheduled'; this.props.executeAfter = executeAfter; this.props.executeBefore = executeBefore;
    this.props.failedAt = null; this.props.failureReason = null;
  }

  toProps(): ScheduledPaymentProps { return { id: this._id, ...this.props }; }
}
