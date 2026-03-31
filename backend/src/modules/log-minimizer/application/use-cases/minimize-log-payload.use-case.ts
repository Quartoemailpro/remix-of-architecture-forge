import { LogMinimizerRepository } from '../../domain/repositories/log-minimizer.repository.js';
import { PayloadMinimizationPolicy } from '../../domain/policies/payload-minimization.policy.js';

export class MinimizeLogPayloadUseCase {
  constructor(private readonly repository: LogMinimizerRepository) {}

  execute(payload: Record<string, unknown>): Record<string, unknown> {
    return PayloadMinimizationPolicy.minimize(payload);
  }
}
