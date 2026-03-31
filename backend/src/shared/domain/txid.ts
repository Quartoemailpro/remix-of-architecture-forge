import { ValueObject } from './value-object.js';

interface TxIdProps { value: string; }

const TXID_REGEX = /^[a-fA-F0-9]{64}$/;

export class TxId extends ValueObject<TxIdProps> {
  private constructor(props: TxIdProps) { super(props); }

  static create(value: string): TxId {
    if (!TXID_REGEX.test(value)) throw new Error(`Invalid transaction ID: ${value}`);
    return new TxId({ value });
  }

  get value(): string { return this.props.value; }
  toString(): string { return this.props.value; }
}
