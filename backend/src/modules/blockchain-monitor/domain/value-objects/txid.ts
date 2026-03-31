import { ValueObject } from '../../../../shared/domain/value-object.js';

interface TxIdProps { value: string; }

export class MonitorTxId extends ValueObject<TxIdProps> {
  private constructor(props: TxIdProps) { super(props); }

  static create(value: string): MonitorTxId {
    if (!/^[a-fA-F0-9]{64}$/.test(value)) throw new Error(`Invalid txid: ${value}`);
    return new MonitorTxId({ value });
  }

  get value(): string { return this.props.value; }
  toString(): string { return this.props.value; }
}
