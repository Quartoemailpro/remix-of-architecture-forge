import { DepositSagaRepository } from '../../domain/repositories/deposit-saga.repository.js';
import { DepositSaga } from '../../domain/entities/deposit-saga.entity.js';

export class InMemoryDepositSagaRepository implements DepositSagaRepository {
  private store = new Map<string, DepositSaga>();

  async save(saga: DepositSaga): Promise<void> { this.store.set(saga.id, saga); }
  async findById(id: string): Promise<DepositSaga | null> { return this.store.get(id) ?? null; }
  async findByNamespace(ns: string): Promise<DepositSaga[]> { return [...this.store.values()].filter(s => s.namespace === ns); }
  async findActive(): Promise<DepositSaga[]> { return [...this.store.values()].filter(s => !['completed', 'failed', 'compensated'].includes(s.status)); }
}
