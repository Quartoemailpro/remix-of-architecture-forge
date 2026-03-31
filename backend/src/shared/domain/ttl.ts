import { ValueObject } from './value-object.js';

interface TTLProps { ms: number; }

const MAX_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export class TTL extends ValueObject<TTLProps> {
  private constructor(props: TTLProps) { super(props); }

  static fromMs(ms: number): TTL {
    if (ms <= 0) throw new Error('TTL must be positive');
    if (ms > MAX_TTL_MS) throw new Error('TTL cannot exceed 7 days');
    return new TTL({ ms });
  }

  static fromMinutes(minutes: number): TTL { return TTL.fromMs(minutes * 60 * 1000); }
  static fromHours(hours: number): TTL { return TTL.fromMs(hours * 60 * 60 * 1000); }

  get ms(): number { return this.props.ms; }
  toString(): string { return `${this.props.ms}ms`; }
}
