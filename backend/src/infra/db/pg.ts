import pg from 'pg';
import { getDbConfig } from '../config/db-config.js';

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    const config = getDbConfig();
    pool = new pg.Pool({
      connectionString: config.connectionString,
      min: config.poolMin,
      max: config.poolMax,
    });
  }
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export async function query<T extends pg.QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult<T>> {
  return getPool().query<T>(text, params);
}
