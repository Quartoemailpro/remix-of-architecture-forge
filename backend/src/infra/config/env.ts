import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  DATABASE_URL: z.string(),
  DB_POOL_MIN: z.coerce.number().default(2),
  DB_POOL_MAX: z.coerce.number().default(10),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  REDIS_KEY_PREFIX: z.string().default('mixer:'),
  JWT_SECRET: z.string().min(16),
  JWT_ISSUER: z.string().default('mixer-backend'),
  JWT_AUDIENCE: z.string().default('mixer-admin'),
  JWT_EXPIRY: z.string().default('1h'),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  FF_ENABLE_ADMIN_API: z.coerce.boolean().default(true),
  FF_ENABLE_METRICS: z.coerce.boolean().default(true),
  BLOCKCHAIN_POLL_INTERVAL_MS: z.coerce.number().default(30000),
  BLOCKCHAIN_MIN_CONFIRMATIONS: z.coerce.number().default(3),
  PAYMENT_MIN_DELAY_MS: z.coerce.number().default(60000),
  PAYMENT_MAX_DELAY_MS: z.coerce.number().default(3600000),
});

export type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

export function loadEnv(): Env {
  if (_env) return _env;
  _env = envSchema.parse(process.env);
  return _env;
}

export function getEnv(): Env {
  if (!_env) throw new Error('Environment not loaded. Call loadEnv() first.');
  return _env;
}
