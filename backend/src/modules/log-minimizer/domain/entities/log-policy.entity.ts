import { Entity } from '../../../../shared/domain/entity.js';

export interface LogPolicyProps {
  id: string;
  scope: string;
  retentionHours: number;
  redactionRules: string[];
  createdAt: number;
  updatedAt: number;
}

export class LogPolicy extends Entity<string> {
  private _scope: string;
  private _retentionHours: number;
  private _redactionRules: string[];
  private _createdAt: number;
  private _updatedAt: number;

  constructor(props: LogPolicyProps) {
    super(props.id);
    this._scope = props.scope;
    this._retentionHours = props.retentionHours;
    this._redactionRules = props.redactionRules;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get scope(): string { return this._scope; }
  get retentionHours(): number { return this._retentionHours; }
  get redactionRules(): string[] { return [...this._redactionRules]; }

  updateRetention(hours: number, now: number): void {
    if (hours < 1 || hours > 720) throw new Error('Retention must be between 1 and 720 hours');
    this._retentionHours = hours;
    this._updatedAt = now;
  }

  addRedactionRule(rule: string, now: number): void {
    if (!this._redactionRules.includes(rule)) {
      this._redactionRules.push(rule);
      this._updatedAt = now;
    }
  }
}
