import { AggregateRoot } from '../../../../shared/domain/aggregate-root.js';

export type SagaStatus = 'initiated' | 'deposit_detected' | 'liquidity_reserved' | 'address_generated' | 'payment_scheduled' | 'completed' | 'failed' | 'compensating' | 'compensated';

export interface DepositSagaProps {
  id: string;
  namespace: string;
  status: SagaStatus;
  currentStep: string | null;
  createdAt: number;
  updatedAt: number;
  completedAt: number | null;
  failedAt: number | null;
  failureReason: string | null;
  compensationStatus: 'none' | 'in_progress' | 'completed';
}

export class DepositSaga extends AggregateRoot<string> {
  private _namespace: string;
  private _status: SagaStatus;
  private _currentStep: string | null;
  private _createdAt: number;
  private _updatedAt: number;
  private _completedAt: number | null;
  private _failedAt: number | null;
  private _failureReason: string | null;
  private _compensationStatus: 'none' | 'in_progress' | 'completed';

  private static readonly TRANSITIONS: Record<SagaStatus, SagaStatus[]> = {
    initiated: ['deposit_detected', 'failed'],
    deposit_detected: ['liquidity_reserved', 'failed'],
    liquidity_reserved: ['address_generated', 'failed', 'compensating'],
    address_generated: ['payment_scheduled', 'failed', 'compensating'],
    payment_scheduled: ['completed', 'failed', 'compensating'],
    completed: [],
    failed: ['compensating'],
    compensating: ['compensated', 'failed'],
    compensated: [],
  };

  private constructor(props: DepositSagaProps) {
    super(props.id);
    this._namespace = props.namespace;
    this._status = props.status;
    this._currentStep = props.currentStep;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._completedAt = props.completedAt;
    this._failedAt = props.failedAt;
    this._failureReason = props.failureReason;
    this._compensationStatus = props.compensationStatus;
  }

  static create(id: string, namespace: string, now: number): DepositSaga {
    return new DepositSaga({
      id, namespace, status: 'initiated', currentStep: 'initiated',
      createdAt: now, updatedAt: now, completedAt: null, failedAt: null, failureReason: null, compensationStatus: 'none',
    });
  }

  static reconstitute(props: DepositSagaProps): DepositSaga {
    return new DepositSaga(props);
  }

  get namespace(): string { return this._namespace; }
  get status(): SagaStatus { return this._status; }
  get currentStep(): string | null { return this._currentStep; }
  get failureReason(): string | null { return this._failureReason; }

  advance(nextStatus: SagaStatus, now: number): void {
    const allowed = DepositSaga.TRANSITIONS[this._status];
    if (!allowed.includes(nextStatus)) {
      throw new Error(`Invalid transition: ${this._status} → ${nextStatus}`);
    }
    this._status = nextStatus;
    this._currentStep = nextStatus;
    this._updatedAt = now;
    if (nextStatus === 'completed') this._completedAt = now;
  }

  fail(reason: string, now: number): void {
    this._status = 'failed';
    this._failedAt = now;
    this._failureReason = reason;
    this._updatedAt = now;
  }

  startCompensation(now: number): void {
    this._status = 'compensating';
    this._compensationStatus = 'in_progress';
    this._updatedAt = now;
  }

  completeCompensation(now: number): void {
    this._status = 'compensated';
    this._compensationStatus = 'completed';
    this._updatedAt = now;
  }

  toProps(): DepositSagaProps {
    return {
      id: this._id, namespace: this._namespace, status: this._status, currentStep: this._currentStep,
      createdAt: this._createdAt, updatedAt: this._updatedAt, completedAt: this._completedAt,
      failedAt: this._failedAt, failureReason: this._failureReason, compensationStatus: this._compensationStatus,
    };
  }
}
