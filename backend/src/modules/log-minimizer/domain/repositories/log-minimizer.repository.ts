import { LogPolicy } from '../entities/log-policy.entity.js';

export interface LogMinimizerRepository {
  savePolicy(policy: LogPolicy): Promise<void>;
  findPolicyByScope(scope: string): Promise<LogPolicy | null>;
  findAllPolicies(): Promise<LogPolicy[]>;
  deleteExpiredLogs(scope: string, beforeMs: number): Promise<number>;
}
