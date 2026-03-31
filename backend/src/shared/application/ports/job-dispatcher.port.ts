export interface JobDispatcherPort {
  dispatch(jobName: string, payload: Record<string, unknown>, options?: { delay?: number }): Promise<void>;
}
