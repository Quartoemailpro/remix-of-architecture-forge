export function defineCleanupLogsJob() {
  return {
    name: 'cleanup-logs',
    interval: 3_600_000,
    handler: async (_payload: Record<string, unknown>): Promise<void> => {
      // TODO: Apply retention policies, delete expired log entries
    },
  };
}
