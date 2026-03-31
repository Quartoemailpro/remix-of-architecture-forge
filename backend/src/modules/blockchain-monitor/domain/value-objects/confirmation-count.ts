import { ValueObject } from '../../../../shared/domain/value-object.js';

interface ConfirmationCountProps { current: number; required: number; }

export class ConfirmationCount extends ValueObject<ConfirmationCountProps> {
  private constructor(props: ConfirmationCountProps) { super(props); }

  static create(current: number, required: number): ConfirmationCount {
    return new ConfirmationCount({ current, required });
  }

  get current(): number { return this.props.current; }
  get required(): number { return this.props.required; }
  isSufficient(): boolean { return this.props.current >= this.props.required; }
}
