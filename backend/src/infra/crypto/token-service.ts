import { randomBytes } from 'node:crypto';

export class TokenService {
  generate(length: number = 32): string {
    return randomBytes(length).toString('base64url');
  }

  generateHex(length: number = 32): string {
    return randomBytes(length).toString('hex');
  }
}
