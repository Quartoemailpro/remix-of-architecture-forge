import type { FastifyInstance } from 'fastify';
import { httpRequestDuration, httpRequestsTotal } from './prometheus.js';

export function registerHttpMetrics(app: FastifyInstance): void {
  app.addHook('onResponse', (request, reply, done) => {
    const labels = {
      method: request.method,
      route: request.routeOptions?.url ?? request.url,
      status_code: reply.statusCode.toString(),
    };
    httpRequestDuration.observe(labels, reply.elapsedTime / 1000);
    httpRequestsTotal.inc(labels);
    done();
  });
}
