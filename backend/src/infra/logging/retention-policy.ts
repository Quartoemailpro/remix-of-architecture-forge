export interface RetentionRule {
  scope: string;
  retentionHours: number;
}

export class RetentionPolicy {
  private rules: Map<string, number> = new Map();

  addRule(scope: string, retentionHours: number): void {
    this.rules.set(scope, retentionHours);
  }

  getRetention(scope: string): number {
    return this.rules.get(scope) ?? 24; // default 24 hours
  }

  isExpired(scope: string, createdAtMs: number, nowMs: number = Date.now()): boolean {
    const retentionMs = this.getRetention(scope) * 60 * 60 * 1000;
    return (nowMs - createdAtMs) > retentionMs;
  }
}
