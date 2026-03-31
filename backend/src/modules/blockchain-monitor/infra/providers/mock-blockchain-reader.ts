import { BlockchainReader } from '../../domain/services/blockchain-reader.service.js';

export class MockBlockchainReader implements BlockchainReader {
  private txMap = new Map<string, { confirmations: number; amount: bigint }>();

  setTransaction(txid: string, confirmations: number, amount: bigint): void {
    this.txMap.set(txid, { confirmations, amount });
  }

  async getConfirmations(txid: string): Promise<number> {
    return this.txMap.get(txid)?.confirmations ?? 0;
  }

  async getTransaction(txid: string) {
    const data = this.txMap.get(txid);
    if (!data) return null;
    return { txid, amount: data.amount, confirmations: data.confirmations };
  }
}
