export interface AddressExpiredEventPayload {
  tokenId: string;
  namespace: string;
  reason: 'ttl_expired' | 'revoked';
  occurredAt: number;
}

export class AddressExpiredEvent {
  readonly type = 'ADDRESS_EXPIRED' as const;
  readonly occurredAt: number;

  constructor(readonly payload: AddressExpiredEventPayload) {
    this.occurredAt = Date.now();
  }

  toJSON(): Record<string, unknown> {
    return {
      type: this.type,
      occurredAt: this.occurredAt,
      payload: this.payload,
    };
  }
}
