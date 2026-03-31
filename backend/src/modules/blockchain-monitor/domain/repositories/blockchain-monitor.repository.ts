import { BlockchainEvent } from '../entities/blockchain-event.entity.js';

export interface BlockchainMonitorRepository {
  save(event: BlockchainEvent): Promise<void>;
  findByTxId(txid: string): Promise<BlockchainEvent | null>;
  findPending(): Promise<BlockchainEvent[]>;
  findDetected(): Promise<BlockchainEvent[]>;
}
