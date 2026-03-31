import { ValueObject } from './value-object.js';

interface AddressProps { value: string; }

const BTC_ADDRESS_REGEX = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/;

export class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) { super(props); }

  static create(value: string): Address {
    if (!BTC_ADDRESS_REGEX.test(value)) throw new Error(`Invalid BTC address: ${value}`);
    return new Address({ value });
  }

  static unsafeCreate(value: string): Address {
    return new Address({ value });
  }

  get value(): string { return this.props.value; }
  toString(): string { return this.props.value; }
}
