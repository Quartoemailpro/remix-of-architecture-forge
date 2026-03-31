export function definePollBlockchainJob() {
  return {
    name: 'poll-blockchain',
    interval: 30_000,
    handler: async (_payload: Record<string, unknown>): Promise<void> => {
      // TODO: Poll blockchain provider for new confirmations on monitored transactions
    },
  };
}
