import { ValueObject } from '../../../../shared/domain/value-object.js';

interface BlockHeightProps { value: number; }

export class BlockHeight extends ValueObject<BlockHeightProps> {
  private constructor(props: BlockHeightProps) { super(props); }

  static create(value: number): BlockHeight {
    if (!Number.isInteger(value) || value < 0) throw new Error('Invalid block height');
    return new BlockHeight({ value });
  }

  get value(): number { return this.props.value; }
}
