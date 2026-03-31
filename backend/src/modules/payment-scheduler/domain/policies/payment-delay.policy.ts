export class PaymentDelayPolicy {
  static calculateDelay(minMs: number, maxMs: number): number {
    return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  }

  static assertValidWindow(executeAfter: number, executeBefore: number): void {
    if (executeBefore <= executeAfter) throw new Error('Execute window is invalid');
    if (executeBefore - executeAfter > 24 * 3600000) throw new Error('Payment window cannot exceed 24 hours');
  }
}
