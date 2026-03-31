export interface DomainEvent {
  readonly type: string;
  readonly occurredAt: number;
  readonly payload: Record<string, unknown>;
  toJSON(): Record<string, unknown>;
}
