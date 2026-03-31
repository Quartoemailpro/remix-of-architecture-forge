import { ValueObject } from '../../../../shared/domain/value-object.js';
interface Props { hours: number; }
export class RetentionWindow extends ValueObject<Props> {
  private constructor(props: Props) { super(props); }
  static create(hours: number): RetentionWindow {
    if (hours < 1) throw new Error('Retention window must be at least 1 hour');
    return new RetentionWindow({ hours });
  }
  get hours(): number { return this.props.hours; }
  get ms(): number { return this.props.hours * 3600000; }
  isExpired(createdAtMs: number, nowMs: number): boolean { return (nowMs - createdAtMs) > this.ms; }
}
