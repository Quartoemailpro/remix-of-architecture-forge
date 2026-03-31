import { RetentionWindow } from '../value-objects/retention-window.js';

export class RetentionEnforcementPolicy {
  static isExpired(retentionHours: number, createdAtMs: number, nowMs: number = Date.now()): boolean {
    const window = RetentionWindow.create(retentionHours);
    return window.isExpired(createdAtMs, nowMs);
  }
}
