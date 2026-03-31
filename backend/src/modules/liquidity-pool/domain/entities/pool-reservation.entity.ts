import { Entity } from '../../../../shared/domain/entity.js';

export type ReservationStatus = 'reserved' | 'released' | 'expired';

export class PoolReservation extends Entity<string> {
  private _poolId: string;
  private _amount: bigint;
  private _status: ReservationStatus;
  private _reservedAt: number;
  private _releasedAt: number | null;

  constructor(props: { id: string; poolId: string; amount: bigint; status: ReservationStatus; reservedAt: number; releasedAt: number | null }) {
    super(props.id);
    this._poolId = props.poolId;
    this._amount = props.amount;
    this._status = props.status;
    this._reservedAt = props.reservedAt;
    this._releasedAt = props.releasedAt;
  }

  get poolId(): string { return this._poolId; }
  get amount(): bigint { return this._amount; }
  get status(): ReservationStatus { return this._status; }

  release(now: number): void {
    this._status = 'released';
    this._releasedAt = now;
  }
}
