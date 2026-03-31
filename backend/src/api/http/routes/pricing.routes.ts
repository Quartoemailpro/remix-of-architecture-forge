import type { FastifyInstance } from 'fastify';

export async function pricingRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', async () => ({
    serviceFeePercent: 1.5,
    networkFeeEstimateSatoshis: 5000,
    minAmountSatoshis: 100_000,
    maxAmountSatoshis: 100_000_000,
    currency: 'BTC',
  }));
}
