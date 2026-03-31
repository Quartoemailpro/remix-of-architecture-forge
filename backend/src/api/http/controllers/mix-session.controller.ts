import type { AppContext } from '../../../app/app-context.js';
import { CreateMixSessionInput } from '../schemas/mix-session.schema.js';

export class MixSessionController {
  constructor(private readonly context: AppContext) {}

  async create(input: CreateMixSessionInput) {
    // Pure orchestration — delegates to use cases
    const sessionId = this.context.uuid.generate();
    // TODO: call deposit-saga start-deposit-saga use case
    return { sessionId, status: 'initiated', createdAt: this.context.clock.now() };
  }

  async getStatus(sessionId: string) {
    // TODO: query deposit-saga status
    return { sessionId, status: 'unknown' };
  }
}
