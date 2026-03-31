const NAMESPACE_REGEX = /^[a-z][a-z0-9\-]{2,63}$/;

export class Namespace {
  private constructor(private readonly value: string) {
    if (!Namespace.isValid(value)) {
      throw new InvalidNamespaceFormatError(value);
    }
  }

  static create(value: string): Namespace {
    return new Namespace(value.trim().toLowerCase());
  }

  static isValid(value: string): boolean {
    return NAMESPACE_REGEX.test(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Namespace): boolean {
    return this.value === other.value;
  }
}

export class InvalidNamespaceFormatError extends Error {
  constructor(value: string) {
    super(
      `Invalid namespace format: "${value}". Must be 3-64 lowercase alphanumeric chars or hyphens, starting with a letter.`
    );
    this.name = 'InvalidNamespaceFormatError';
  }
}
