import { BlockchainMonitorRepository } from '../../domain/repositories/blockchain-monitor.repository.js';
import { BlockchainEvent } from '../../domain/entities/blockchain-event.entity.js';

export class RegisterTransactionWatchUseCase {
  constructor(private readonly repository: BlockchainMonitorRepository) {}

  async execute(input: { id: string; txid: string; namespace: string; requiredConfirmations: number; expectedAmount?: bigint }): Promise<void> {
    const existing = await this.repository.findByTxId(input.txid);
    if (existing) throw new Error(`Transaction ${input.txid} is already being watched`);

    const event = BlockchainEvent.create({
      id: input.id,
      txid: input.txid,
      namespace: input.namespace,
      expectedAmount: input.expectedAmount ?? null,
      requiredConfirmations: input.requiredConfirmations,
      createdAt: Date.now(),
    });

    await this.repository.save(event);
  }
}
