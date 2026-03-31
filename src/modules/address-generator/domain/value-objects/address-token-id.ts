import { randomUUID } from 'crypto';

export class AddressTokenId {
  private constructor(private readonly value: string) {
    if (!AddressTokenId.isValid(value)) {
      throw new Error(`Invalid AddressTokenId: ${value}`);
    }
  }

  static create(): AddressTokenId {
    return new AddressTokenId(randomUUID());
  }

  static fromString(value: string): AddressTokenId {
    return new AddressTokenId(value);
  }

  static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: AddressTokenId): boolean {
    return this.value === other.value;
  }
}
