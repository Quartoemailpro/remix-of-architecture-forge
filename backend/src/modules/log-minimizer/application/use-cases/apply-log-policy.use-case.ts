import { LogMinimizerRepository } from '../../domain/repositories/log-minimizer.repository.js';
import { LogPolicy } from '../../domain/entities/log-policy.entity.js';

export class ApplyLogPolicyUseCase {
  constructor(private readonly repository: LogMinimizerRepository) {}

  async execute(input: { id: string; scope: string; retentionHours: number; redactionRules: string[] }): Promise<void> {
    const policy = new LogPolicy({
      id: input.id, scope: input.scope, retentionHours: input.retentionHours,
      redactionRules: input.redactionRules, createdAt: Date.now(), updatedAt: Date.now(),
    });
    await this.repository.savePolicy(policy);
  }
}
