const SENSITIVE_KEYS = new Set(['password', 'secret', 'token', 'authorization', 'cookie', 'ip', 'email', 'wallet']);
const PII_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  /\b\d{1,3}(\.\d{1,3}){3}\b/,
  /[0-9a-fA-F]{40,}/,
];

export function redact(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      result[key] = '[REDACTED]';
    } else if (typeof value === 'string') {
      let redacted = value;
      for (const pattern of PII_PATTERNS) {
        redacted = redacted.replace(pattern, '[REDACTED]');
      }
      result[key] = redacted;
    } else if (typeof value === 'object' && value !== null) {
      result[key] = redact(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}
