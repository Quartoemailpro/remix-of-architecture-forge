import { LoggerPort } from '../../shared/application/ports/logger.port.js';

export class FakeLogger implements LoggerPort {
  readonly logs: { level: string; message: string; context?: Record<string, unknown> }[] = [];
  info(msg: string, ctx?: Record<string, unknown>) { this.logs.push({ level: 'info', message: msg, context: ctx }); }
  warn(msg: string, ctx?: Record<string, unknown>) { this.logs.push({ level: 'warn', message: msg, context: ctx }); }
  error(msg: string, ctx?: Record<string, unknown>) { this.logs.push({ level: 'error', message: msg, context: ctx }); }
  debug(msg: string, ctx?: Record<string, unknown>) { this.logs.push({ level: 'debug', message: msg, context: ctx }); }
}
