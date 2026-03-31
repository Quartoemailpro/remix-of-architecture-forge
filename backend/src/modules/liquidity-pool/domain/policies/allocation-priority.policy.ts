export class AllocationPriorityPolicy {
  static calculatePriority(amount: bigint, poolAvailable: bigint): number {
    if (poolAvailable === 0n) return 0;
    const ratio = Number((amount * 100n) / poolAvailable);
    if (ratio > 50) return 3; // high priority — large allocation
    if (ratio > 20) return 2;
    return 1;
  }
}
