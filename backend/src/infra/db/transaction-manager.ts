import { getPool } from './pg.js';
import { TransactionManagerPort } from '../../shared/application/ports/transaction-manager.port.js';

export class PgTransactionManager implements TransactionManagerPort {
  async run<T>(work: () => Promise<T>): Promise<T> {
    const client = await getPool().connect();
    try {
      await client.query('BEGIN');
      const result = await work();
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
