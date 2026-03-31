import { ClockPort } from '../../shared/application/ports/clock.port.js';

export class SystemClock implements ClockPort {
  now(): number { return Date.now(); }
  isoNow(): string { return new Date().toISOString(); }
}
