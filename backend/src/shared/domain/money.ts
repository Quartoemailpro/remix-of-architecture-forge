import { ValueObject } from './value-object.js';

interface MoneyProps {
  amount: bigint;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  static fromSatoshis(satoshis: bigint): Money {
    return new Money({ amount: satoshis, currency: 'BTC' });
  }

  static zero(): Money {
    return new Money({ amount: 0n, currency: 'BTC' });
  }

  get amount(): bigint { return this.props.amount; }
  get currency(): string { return this.props.currency; }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money({ amount: this.props.amount + other.props.amount, currency: this.props.currency });
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    if (other.props.amount > this.props.amount) throw new Error('Insufficient funds');
    return new Money({ amount: this.props.amount - other.props.amount, currency: this.props.currency });
  }

  isGreaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.props.amount > other.props.amount;
  }

  private assertSameCurrency(other: Money): void {
    if (this.props.currency !== other.props.currency) throw new Error('Currency mismatch');
  }

  toString(): string { return `${this.props.amount} ${this.props.currency}`; }
}
