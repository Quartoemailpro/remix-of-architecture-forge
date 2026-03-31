export class CompensationPolicy {
  static shouldCompensate(failedStep: string): string[] {
    const compensationMap: Record<string, string[]> = {
      payment_scheduled: ['release-liquidity', 'revoke-address'],
      address_generated: ['release-liquidity'],
      liquidity_reserved: ['release-liquidity'],
    };
    return compensationMap[failedStep] ?? [];
  }
}
