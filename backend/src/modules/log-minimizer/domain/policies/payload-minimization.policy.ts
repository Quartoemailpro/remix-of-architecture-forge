const ALLOWED_FIELDS = new Set(['timestamp', 'level', 'scope', 'action', 'duration', 'status', 'errorCode']);

export class PayloadMinimizationPolicy {
  static minimize(payload: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (ALLOWED_FIELDS.has(key)) result[key] = value;
    }
    return result;
  }

  static assertMinimal(payload: Record<string, unknown>): void {
    for (const key of Object.keys(payload)) {
      if (!ALLOWED_FIELDS.has(key)) throw new Error(`Forbidden log field: ${key}`);
    }
  }
}
