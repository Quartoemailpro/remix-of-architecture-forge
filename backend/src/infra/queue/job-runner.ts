import { JobDispatcherPort } from '../../shared/application/ports/job-dispatcher.port.js';

interface JobDefinition {
  name: string;
  handler: (payload: Record<string, unknown>) => Promise<void>;
  interval?: number;
}

export class JobRunner {
  private jobs = new Map<string, JobDefinition>();
  private timers = new Map<string, NodeJS.Timeout>();

  register(job: JobDefinition): void {
    this.jobs.set(job.name, job);
  }

  startRecurring(): void {
    for (const [name, job] of this.jobs) {
      if (job.interval) {
        const timer = setInterval(() => {
          job.handler({}).catch(err => console.error(`Job ${name} failed:`, err));
        }, job.interval);
        this.timers.set(name, timer);
      }
    }
  }

  async runOnce(name: string, payload: Record<string, unknown>): Promise<void> {
    const job = this.jobs.get(name);
    if (!job) throw new Error(`Unknown job: ${name}`);
    await job.handler(payload);
  }

  stopAll(): void {
    for (const timer of this.timers.values()) clearInterval(timer);
    this.timers.clear();
  }
}
