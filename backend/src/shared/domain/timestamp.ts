import { ValueObject } from './value-object.js';

interface TimestampProps { epochMs: number; }

export class Timestamp extends ValueObject<TimestampProps> {
  private constructor(props: TimestampProps) { super(props); }

  static now(): Timestamp { return new Timestamp({ epochMs: Date.now() }); }
  static fromEpoch(ms: number): Timestamp { return new Timestamp({ epochMs: ms }); }

  get epochMs(): number { return this.props.epochMs; }
  isBefore(other: Timestamp): boolean { return this.props.epochMs < other.props.epochMs; }
  isAfter(other: Timestamp): boolean { return this.props.epochMs > other.props.epochMs; }
  addMs(ms: number): Timestamp { return new Timestamp({ epochMs: this.props.epochMs + ms }); }
  toString(): string { return new Date(this.props.epochMs).toISOString(); }
}
