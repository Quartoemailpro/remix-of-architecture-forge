import { BlockchainMonitorRepository } from '../../domain/repositories/blockchain-monitor.repository.js';
import { BlockchainReaderService } from '../../domain/services/blockchain-reader.service.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { DepositDetectedEvent } from '../../domain/events/deposit-detected.event.js';
import { DepositConfirmedEvent } from '../../domain/events/deposit-confirmed.event.js';

export class PollBlockchainUseCase {
  constructor(
    private readonly repository: BlockchainMonitorRepository,
    private readonly readerService: BlockchainReaderService,
    private readonly eventBus: EventBusPort,
  ) {}

  async execute(): Promise<void> {
    const pending = await this.repository.findPending();
    const detected = await this.repository.findDetected();
    const allWatched = [...pending, ...detected];

    for (const event of allWatched) {
      const confirmations = await this.readerService.checkConfirmations(event.txid);
      event.updateConfirmations(confirmations);

      if (event.status === 'pending' && confirmations > 0) {
        const now = Date.now();
        event.detect(now);
        this.eventBus.publish(new DepositDetectedEvent({
          txid: event.txid, namespace: event.namespace, amount: null, detectedAt: now,
        }));
      }

      if (event.isConfirmable()) {
        const now = Date.now();
        event.confirm(now);
        this.eventBus.publish(new DepositConfirmedEvent({
          txid: event.txid, namespace: event.namespace, confirmations, confirmedAt: now,
        }));
      }

      await this.repository.save(event);
    }
  }
}
