import { AddressToken } from '../entities/address-token.entity';

/**
 * Enforces that expired or revoked tokens cannot be used.
 */
export class AddressExpirationPolicy {
  static assertUsable(token: AddressToken, now: number = Date.now()): void {
    if (token.isExpired(now)) {
      throw new AddressExpiredError(token.id.toString());
    }
    if (token.status === 'revoked') {
      throw new AddressRevokedError(token.id.toString());
    }
  }
}

export class AddressExpiredError extends Error {
  constructor(tokenId: string) {
    super(`Address token "${tokenId}" has expired and cannot be used.`);
    this.name = 'AddressExpiredError';
  }
}

export class AddressRevokedError extends Error {
  constructor(tokenId: string) {
    super(`Address token "${tokenId}" has been revoked and cannot be used.`);
    this.name = 'AddressRevokedError';
  }
}
