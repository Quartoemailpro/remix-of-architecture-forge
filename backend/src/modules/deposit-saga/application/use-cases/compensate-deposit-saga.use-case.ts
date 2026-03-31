import { DepositSagaRepository } from '../../domain/repositories/deposit-saga.repository.js';
import { CompensationPolicy } from '../../domain/policies/compensation.policy.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { DepositSagaFailedEvent } from '../../domain/events/deposit-saga.events.js';

export class CompensateDepositSagaUseCase {
  constructor(private readonly repository: DepositSagaRepository, private readonly eventBus: EventBusPort) {}

  async execute(sagaId: string): Promise<string[]> {
    const saga = await this.repository.findById(sagaId);
    if (!saga) throw new Error(`Saga ${sagaId} not found`);

    const steps = CompensationPolicy.shouldCompensate(saga.currentStep ?? '');
    saga.startCompensation(Date.now());

    // Execute compensation steps (would call other module use cases)
    // For now, mark as compensated
    saga.completeCompensation(Date.now());
    await this.repository.save(saga);

    this.eventBus.publish(new DepositSagaFailedEvent({
      sagaId, namespace: saga.namespace, reason: saga.failureReason ?? 'compensation',
    }));

    return steps;
  }
}
