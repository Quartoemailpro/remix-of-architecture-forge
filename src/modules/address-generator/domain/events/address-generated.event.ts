export interface AddressGeneratedEventPayload {
  tokenId: string;
  namespace: string;
  controlCode: string;
  createdAt: number;
  expiresAt: number;
}

export class AddressGeneratedEvent {
  readonly type = 'ADDRESS_GENERATED' as const;
  readonly occurredAt: number;

  constructor(readonly payload: AddressGeneratedEventPayload) {
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
