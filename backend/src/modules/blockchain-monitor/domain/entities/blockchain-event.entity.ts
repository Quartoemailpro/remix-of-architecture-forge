import { AggregateRoot } from '../../../../shared/domain/aggregate-root.js';

export type BlockchainEventStatus = 'pending' | 'detected' | 'confirmed' | 'failed';

export interface BlockchainEventProps {
  id: string;
  txid: string;
  namespace: string;
  expectedAmount: bigint | null;
  confirmations: number;
  requiredConfirmations: number;
  status: BlockchainEventStatus;
  detectedAt: number | null;
  confirmedAt: number | null;
  createdAt: number;
}

export class BlockchainEvent extends AggregateRoot<string> {
  private _txid: string;
  private _namespace: string;
  private _expectedAmount: bigint | null;
  private _confirmations: number;
  private _requiredConfirmations: number;
  private _status: BlockchainEventStatus;
  private _detectedAt: number | null;
  private _confirmedAt: number | null;
  private _createdAt: number;

  private constructor(props: BlockchainEventProps) {
    super(props.id);
    this._txid = props.txid;
    this._namespace = props.namespace;
    this._expectedAmount = props.expectedAmount;
    this._confirmations = props.confirmations;
    this._requiredConfirmations = props.requiredConfirmations;
    this._status = props.status;
    this._detectedAt = props.detectedAt;
    this._confirmedAt = props.confirmedAt;
    this._createdAt = props.createdAt;
  }

  static create(props: Omit<BlockchainEventProps, 'status' | 'confirmations' | 'detectedAt' | 'confirmedAt'>): BlockchainEvent {
    return new BlockchainEvent({ ...props, status: 'pending', confirmations: 0, detectedAt: null, confirmedAt: null });
  }

  static reconstitute(props: BlockchainEventProps): BlockchainEvent {
    return new BlockchainEvent(props);
  }

  get txid(): string { return this._txid; }
  get namespace(): string { return this._namespace; }
  get confirmations(): number { return this._confirmations; }
  get requiredConfirmations(): number { return this._requiredConfirmations; }
  get status(): BlockchainEventStatus { return this._status; }
  get detectedAt(): number | null { return this._detectedAt; }
  get confirmedAt(): number | null { return this._confirmedAt; }
  get createdAt(): number { return this._createdAt; }

  detect(now: number): void {
    if (this._status !== 'pending') throw new Error('Can only detect pending transactions');
    this._status = 'detected';
    this._detectedAt = now;
  }

  updateConfirmations(count: number): void {
    this._confirmations = count;
  }

  confirm(now: number): void {
    if (this._confirmations < this._requiredConfirmations) {
      throw new Error(`Insufficient confirmations: ${this._confirmations}/${this._requiredConfirmations}`);
    }
    this._status = 'confirmed';
    this._confirmedAt = now;
  }

  fail(): void {
    this._status = 'failed';
  }

  isConfirmable(): boolean {
    return this._confirmations >= this._requiredConfirmations && this._status === 'detected';
  }
}
