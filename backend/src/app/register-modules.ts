import type { AppContext } from './app-context.js';
import { registerEventHandlers } from '../infra/events/register-event-handlers.js';

export function registerModules(context: AppContext): void {
  // Wire inter-module event handlers
  registerEventHandlers(context.eventBus);

  // Register recurring jobs
  // context.jobRunner.register(defineExpireSessionsJob());
  // context.jobRunner.register(definePollBlockchainJob());
  // context.jobRunner.register(defineSchedulePaymentsJob());
  // context.jobRunner.register(defineCleanupLogsJob());
}
