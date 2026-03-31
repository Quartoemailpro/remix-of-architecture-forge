import { ValueObject } from '../../../../shared/domain/value-object.js';
interface Props { pattern: string; replacement: string; }
export class RedactionRule extends ValueObject<Props> {
  private constructor(props: Props) { super(props); }
  static create(pattern: string, replacement: string = '[REDACTED]'): RedactionRule {
    return new RedactionRule({ pattern, replacement });
  }
  apply(input: string): string {
    return input.replace(new RegExp(this.props.pattern, 'g'), this.props.replacement);
  }
}
