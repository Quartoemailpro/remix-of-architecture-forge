/**
 * Enforces that only safe, non-PII metadata is exposed or stored.
 * Whitelisted fields only.
 */

const ALLOWED_METADATA_KEYS = new Set([
  'tokenId',
  'namespace',
  'controlCode',
  'purpose',
  'createdAt',
  'expiresAt',
  'status',
]);

const PII_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, // email
  /\b\d{1,3}(\.\d{1,3}){3}\b/, // IPv4
  /[0-9a-fA-F]{40,}/, // wallet/hex identifiers
  /user[_-]?id/i,
];

export class MinimalMetadataPolicy {
  static enforce(metadata: Record<string, unknown>): void {
    for (const key of Object.keys(metadata)) {
      if (!ALLOWED_METADATA_KEYS.has(key)) {
        throw new ForbiddenMetadataError(key);
      }
    }
    const serialized = JSON.stringify(metadata);
    for (const pattern of PII_PATTERNS) {
      if (pattern.test(serialized)) {
        throw new PIIInMetadataError(pattern.source);
      }
    }
  }
}

export class ForbiddenMetadataError extends Error {
  constructor(key: string) {
    super(`Forbidden metadata key: "${key}". Only whitelisted keys are allowed.`);
    this.name = 'ForbiddenMetadataError';
  }
}

export class PIIInMetadataError extends Error {
  constructor(patternSource: string) {
    super(`PII detected in metadata. Matched: ${patternSource}`);
    this.name = 'PIIInMetadataError';
  }
}
