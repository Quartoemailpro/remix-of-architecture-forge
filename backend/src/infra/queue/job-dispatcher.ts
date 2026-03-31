import { JobDispatcherPort } from '../../shared/application/ports/job-dispatcher.port.js';
import { JobRunner } from './job-runner.js';

export class JobDispatcher implements JobDispatcherPort {
  constructor(private readonly runner: JobRunner) {}

  async dispatch(jobName: string, payload: Record<string, unknown>, options?: { delay?: number }): Promise<void> {
    if (options?.delay) {
      setTimeout(() => {
        this.runner.runOnce(jobName, payload).catch(console.error);
      }, options.delay);
    } else {
      await this.runner.runOnce(jobName, payload);
    }
  }
}
