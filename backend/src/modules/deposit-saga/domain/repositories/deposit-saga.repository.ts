import { DepositSaga } from '../entities/deposit-saga.entity.js';

export interface DepositSagaRepository {
  save(saga: DepositSaga): Promise<void>;
  findById(id: string): Promise<DepositSaga | null>;
  findByNamespace(namespace: string): Promise<DepositSaga[]>;
  findActive(): Promise<DepositSaga[]>;
}
