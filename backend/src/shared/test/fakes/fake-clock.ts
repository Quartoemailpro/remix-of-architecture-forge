import { ClockPort } from '../../shared/application/ports/clock.port.js';

export class FakeClock implements ClockPort {
  private _now: number;
  constructor(initial: number = Date.now()) { this._now = initial; }
  now(): number { return this._now; }
  isoNow(): string { return new Date(this._now).toISOString(); }
  advance(ms: number): void { this._now += ms; }
  set(ms: number): void { this._now = ms; }
}
