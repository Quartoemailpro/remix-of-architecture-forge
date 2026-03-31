/**
 * IssuanceContext holds ONLY non-PII metadata about the issuance.
 * It enforces the minimal-metadata policy at the value-object level.
 */

const FORBIDDEN_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, // email
  /\b\d{1,3}(\.\d{1,3}){3}\b/, // IPv4
  /[0-9a-fA-F]{40}/, // wallet-like hex string (40+ hex chars)
  /user[_-]?id/i, // user identifier keys
];

export interface IssuanceContextProps {
  readonly purpose: string;
  readonly controlCode: string;
  readonly issuedAtEpoch: number;
}

export class IssuanceContext {
  readonly purpose: string;
  readonly controlCode: string;
  readonly issuedAtEpoch: number;

  private constructor(props: IssuanceContextProps) {
    this.purpose = props.purpose;
    this.controlCode = props.controlCode;
    this.issuedAtEpoch = props.issuedAtEpoch;
  }

  static create(props: IssuanceContextProps): IssuanceContext {
    const serialized = JSON.stringify(props);
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(serialized)) {
        throw new PIIDetectedError(pattern.source);
      }
    }
    if (props.purpose.length > 128 || props.controlCode.length > 64) {
      throw new Error('IssuanceContext fields exceed maximum allowed length.');
    }
    return new IssuanceContext(props);
  }

  toPlain(): IssuanceContextProps {
    return {
      purpose: this.purpose,
      controlCode: this.controlCode,
      issuedAtEpoch: this.issuedAtEpoch,
    };
  }
}

export class PIIDetectedError extends Error {
  constructor(patternSource: string) {
    super(`PII detected in issuance context. Matched pattern: ${patternSource}`);
    this.name = 'PIIDetectedError';
  }
}
