export interface TransactionManagerPort {
  run<T>(work: () => Promise<T>): Promise<T>;
}
