export interface BlockchainReader {
  getConfirmations(txid: string): Promise<number>;
  getTransaction(txid: string): Promise<{ txid: string; amount: bigint; confirmations: number } | null>;
}

export class BlockchainReaderService {
  constructor(private readonly reader: BlockchainReader) {}

  async checkConfirmations(txid: string): Promise<number> {
    return this.reader.getConfirmations(txid);
  }

  async lookupTransaction(txid: string) {
    return this.reader.getTransaction(txid);
  }
}
