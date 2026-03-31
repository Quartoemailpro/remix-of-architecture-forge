import pino from 'pino';
import { getAppConfig } from '../config/app-config.js';
import { LoggerPort } from '../../shared/application/ports/logger.port.js';
import { redact } from './redact.js';

const pinoLogger = pino({
  level: 'info',
  serializers: {
    err: pino.stdSerializers.err,
  },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.secret', '*.token'],
    censor: '[REDACTED]',
  },
});

export class PinoLogger implements LoggerPort {
  private logger: pino.Logger;

  constructor(context?: string) {
    this.logger = context ? pinoLogger.child({ context }) : pinoLogger;
  }

  info(message: string, ctx?: Record<string, unknown>): void {
    this.logger.info(ctx ? redact(ctx) : {}, message);
  }

  warn(message: string, ctx?: Record<string, unknown>): void {
    this.logger.warn(ctx ? redact(ctx) : {}, message);
  }

  error(message: string, ctx?: Record<string, unknown>): void {
    this.logger.error(ctx ? redact(ctx) : {}, message);
  }

  debug(message: string, ctx?: Record<string, unknown>): void {
    this.logger.debug(ctx ? redact(ctx) : {}, message);
  }
}

export { pinoLogger };
