import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPool } from './pg.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function runMigrations(): Promise<void> {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name VARCHAR(255) PRIMARY KEY,
      executed_at TIMESTAMP DEFAULT NOW()
    );
  `);

  const { rows: executed } = await pool.query<{ name: string }>('SELECT name FROM _migrations ORDER BY name');
  const executedSet = new Set(executed.map(r => r.name));

  const migrationsDir = join(__dirname, 'migrations');
  const files = readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  for (const file of files) {
    if (executedSet.has(file)) continue;
    const sql = readFileSync(join(migrationsDir, file), 'utf-8');
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
    await pool.query('INSERT INTO _migrations (name) VALUES ($1)', [file]);
  }

  console.log('Migrations complete.');
  await pool.end();
}

runMigrations().catch(err => { console.error('Migration failed:', err); process.exit(1); });
