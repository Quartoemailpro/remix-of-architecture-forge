import { BlockchainMonitorRepository } from '../../domain/repositories/blockchain-monitor.repository.js';
import { BlockchainEvent } from '../../domain/entities/blockchain-event.entity.js';

export class InMemoryBlockchainMonitorRepository implements BlockchainMonitorRepository {
  private store = new Map<string, BlockchainEvent>();

  async save(event: BlockchainEvent): Promise<void> { this.store.set(event.txid, event); }
  async findByTxId(txid: string): Promise<BlockchainEvent | null> { return this.store.get(txid) ?? null; }
  async findPending(): Promise<BlockchainEvent[]> { return [...this.store.values()].filter(e => e.status === 'pending'); }
  async findDetected(): Promise<BlockchainEvent[]> { return [...this.store.values()].filter(e => e.status === 'detected'); }
}
