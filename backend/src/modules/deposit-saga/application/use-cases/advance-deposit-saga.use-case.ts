import { DepositSagaRepository } from '../../domain/repositories/deposit-saga.repository.js';
import { SagaStatus } from '../../domain/entities/deposit-saga.entity.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { DepositAcceptedEvent } from '../../domain/events/deposit-saga.events.js';

export class AdvanceDepositSagaUseCase {
  constructor(private readonly repository: DepositSagaRepository, private readonly eventBus: EventBusPort) {}

  async execute(input: { sagaId: string; nextStatus: SagaStatus }): Promise<void> {
    const saga = await this.repository.findById(input.sagaId);
    if (!saga) throw new Error(`Saga ${input.sagaId} not found`);

    saga.advance(input.nextStatus, Date.now());
    await this.repository.save(saga);

    this.eventBus.publish(new DepositAcceptedEvent({
      sagaId: input.sagaId, namespace: saga.namespace, step: input.nextStatus,
    }));
  }
}
