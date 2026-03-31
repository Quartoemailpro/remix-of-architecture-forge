import { redact } from './redact.js';

export class AuditLogSerializer {
  serialize(action: string, metadata: Record<string, unknown>): string {
    const entry = {
      action,
      timestamp: Date.now(),
      metadata: redact(metadata),
    };
    return JSON.stringify(entry);
  }
}
