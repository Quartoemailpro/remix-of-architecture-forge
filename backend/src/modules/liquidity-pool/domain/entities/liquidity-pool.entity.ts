import { AggregateRoot } from '../../../../shared/domain/aggregate-root.js';

export interface LiquidityPoolProps {
  id: string;
  totalBalance: bigint;
  availableBalance: bigint;
  reservedBalance: bigint;
  updatedAt: number;
}

export class LiquidityPool extends AggregateRoot<string> {
  private _totalBalance: bigint;
  private _availableBalance: bigint;
  private _reservedBalance: bigint;
  private _updatedAt: number;

  private constructor(props: LiquidityPoolProps) {
    super(props.id);
    this._totalBalance = props.totalBalance;
    this._availableBalance = props.availableBalance;
    this._reservedBalance = props.reservedBalance;
    this._updatedAt = props.updatedAt;
  }

  static create(id: string, initialBalance: bigint, now: number): LiquidityPool {
    return new LiquidityPool({ id, totalBalance: initialBalance, availableBalance: initialBalance, reservedBalance: 0n, updatedAt: now });
  }

  static reconstitute(props: LiquidityPoolProps): LiquidityPool {
    return new LiquidityPool(props);
  }

  get totalBalance(): bigint { return this._totalBalance; }
  get availableBalance(): bigint { return this._availableBalance; }
  get reservedBalance(): bigint { return this._reservedBalance; }

  reserve(amount: bigint, now: number): void {
    if (amount > this._availableBalance) throw new Error('Insufficient liquidity');
    this._availableBalance -= amount;
    this._reservedBalance += amount;
    this._updatedAt = now;
  }

  release(amount: bigint, now: number): void {
    if (amount > this._reservedBalance) throw new Error('Release exceeds reserved balance');
    this._reservedBalance -= amount;
    this._availableBalance += amount;
    this._updatedAt = now;
  }

  disburse(amount: bigint, now: number): void {
    if (amount > this._reservedBalance) throw new Error('Disburse exceeds reserved balance');
    this._reservedBalance -= amount;
    this._totalBalance -= amount;
    this._updatedAt = now;
  }

  deposit(amount: bigint, now: number): void {
    this._totalBalance += amount;
    this._availableBalance += amount;
    this._updatedAt = now;
  }

  toProps(): LiquidityPoolProps {
    return { id: this._id, totalBalance: this._totalBalance, availableBalance: this._availableBalance, reservedBalance: this._reservedBalance, updatedAt: this._updatedAt };
  }
}
