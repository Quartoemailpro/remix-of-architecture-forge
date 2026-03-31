import { LogMinimizerRepository } from '../../domain/repositories/log-minimizer.repository.js';
import { RetentionEnforcementPolicy } from '../../domain/policies/retention-enforcement.policy.js';
import { EventBusPort } from '../../../../shared/application/ports/event-bus.port.js';
import { LogsMinimizedEvent } from '../../domain/events/logs-minimized.event.js';

export class CleanupExpiredLogsUseCase {
  constructor(private readonly repository: LogMinimizerRepository, private readonly eventBus: EventBusPort) {}

  async execute(): Promise<void> {
    const policies = await this.repository.findAllPolicies();
    const now = Date.now();
    for (const policy of policies) {
      const cutoff = now - (policy.retentionHours * 3600000);
      const removed = await this.repository.deleteExpiredLogs(policy.scope, cutoff);
      if (removed > 0) {
        this.eventBus.publish(new LogsMinimizedEvent({ scope: policy.scope, entriesRemoved: removed }));
      }
    }
  }
}
