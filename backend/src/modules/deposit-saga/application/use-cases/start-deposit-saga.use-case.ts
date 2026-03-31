import { DepositSagaRepository } from '../../domain/repositories/deposit-saga.repository.js';
import { DepositSaga } from '../../domain/entities/deposit-saga.entity.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { DepositSagaStartedEvent } from '../../domain/events/deposit-saga.events.js';

export class StartDepositSagaUseCase {
  constructor(private readonly repository: DepositSagaRepository, private readonly eventBus: EventBusPort) {}

  async execute(input: { sagaId: string; namespace: string }): Promise<void> {
    const saga = DepositSaga.create(input.sagaId, input.namespace, Date.now());
    await this.repository.save(saga);
    this.eventBus.publish(new DepositSagaStartedEvent({ sagaId: input.sagaId, namespace: input.namespace }));
  }
}
