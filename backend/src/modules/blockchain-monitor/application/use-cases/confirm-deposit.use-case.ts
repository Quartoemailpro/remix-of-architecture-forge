import { BlockchainMonitorRepository } from '../../domain/repositories/blockchain-monitor.repository.js';
import { ConfirmationCount } from '../../domain/value-objects/confirmation-count.js';
import { ConfirmationThresholdPolicy } from '../../domain/policies/confirmation-threshold.policy.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { DepositConfirmedEvent } from '../../domain/events/deposit-confirmed.event.js';

export class ConfirmDepositUseCase {
  constructor(
    private readonly repository: BlockchainMonitorRepository,
    private readonly eventBus: EventBusPort,
  ) {}

  async execute(txid: string): Promise<void> {
    const event = await this.repository.findByTxId(txid);
    if (!event) throw new Error(`Transaction ${txid} not found`);

    const count = ConfirmationCount.create(event.confirmations, event.requiredConfirmations);
    ConfirmationThresholdPolicy.assertMet(count);

    const now = Date.now();
    event.confirm(now);
    await this.repository.save(event);

    this.eventBus.publish(new DepositConfirmedEvent({
      txid: event.txid, namespace: event.namespace, confirmations: event.confirmations, confirmedAt: now,
    }));
  }
}
