import { ValueObject } from './value-object.js';

interface PercentageProps { value: number; }

export class Percentage extends ValueObject<PercentageProps> {
  private constructor(props: PercentageProps) { super(props); }

  static create(value: number): Percentage {
    if (value < 0 || value > 100) throw new Error('Percentage must be between 0 and 100');
    return new Percentage({ value });
  }

  get value(): number { return this.props.value; }

  applyTo(amount: bigint): bigint {
    return (amount * BigInt(Math.round(this.props.value * 100))) / 10000n;
  }

  toString(): string { return `${this.props.value}%`; }
}
