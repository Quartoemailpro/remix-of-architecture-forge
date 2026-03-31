export function defineSchedulePaymentsJob() {
  return {
    name: 'schedule-payments',
    interval: 60_000,
    handler: async (_payload: Record<string, unknown>): Promise<void> => {
      // TODO: Find payments where execute_after <= now AND status = 'scheduled', execute them
    },
  };
}
