import client from 'prom-client';
import { metricsRegistry } from './prometheus.js';

export const addressesGenerated = new client.Counter({
  name: 'domain_addresses_generated_total',
  help: 'Total addresses generated',
  labelNames: ['namespace'],
  registers: [metricsRegistry],
});

export const depositsDetected = new client.Counter({
  name: 'domain_deposits_detected_total',
  help: 'Total deposits detected',
  registers: [metricsRegistry],
});

export const paymentsScheduled = new client.Counter({
  name: 'domain_payments_scheduled_total',
  help: 'Total payments scheduled',
  registers: [metricsRegistry],
});

export const sagaCompletions = new client.Counter({
  name: 'domain_saga_completions_total',
  help: 'Total completed deposit sagas',
  labelNames: ['status'],
  registers: [metricsRegistry],
});
