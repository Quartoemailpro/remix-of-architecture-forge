import { ValueObject } from '../../../../shared/domain/value-object.js';
interface Props { value: string; }
export class LogScope extends ValueObject<Props> {
  private constructor(props: Props) { super(props); }
  static create(value: string): LogScope {
    if (!value || value.length > 64) throw new Error('Invalid log scope');
    return new LogScope({ value });
  }
  get value(): string { return this.props.value; }
}
