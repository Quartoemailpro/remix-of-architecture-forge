import { createHash, randomBytes } from 'node:crypto';

export class HashService {
  sha256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  }

  hmac(input: string, key: string): string {
    return createHash('sha256').update(`${key}:${input}`).digest('hex');
  }

  randomHex(bytes: number = 32): string {
    return randomBytes(bytes).toString('hex');
  }
}
