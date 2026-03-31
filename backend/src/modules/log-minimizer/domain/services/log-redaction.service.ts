import { RedactionRule } from '../value-objects/redaction-rule.js';

export class LogRedactionService {
  private rules: RedactionRule[] = [];

  addRule(rule: RedactionRule): void { this.rules.push(rule); }

  redact(payload: string): string {
    let result = payload;
    for (const rule of this.rules) {
      result = rule.apply(result);
    }
    return result;
  }

  redactObject(obj: Record<string, unknown>): Record<string, unknown> {
    const serialized = JSON.stringify(obj);
    const redacted = this.redact(serialized);
    return JSON.parse(redacted);
  }
}
