import { SagaStatus } from '../entities/deposit-saga.entity.js';

export class DepositStateTransitionPolicy {
  private static readonly VALID_TRANSITIONS: Record<SagaStatus, SagaStatus[]> = {
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

  static isValidTransition(from: SagaStatus, to: SagaStatus): boolean {
    return (this.VALID_TRANSITIONS[from] ?? []).includes(to);
  }

  static assertValid(from: SagaStatus, to: SagaStatus): void {
    if (!this.isValidTransition(from, to)) {
      throw new Error(`Invalid saga state transition: ${from} → ${to}`);
    }
  }
}
