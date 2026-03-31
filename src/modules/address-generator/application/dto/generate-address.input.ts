export interface GenerateAddressInput {
  namespace: string;
  purpose: string;
  controlCode: string;
  ttlMs: number;
  seed?: string;
}
