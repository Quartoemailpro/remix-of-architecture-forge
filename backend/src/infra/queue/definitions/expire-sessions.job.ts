export function defineExpireSessionsJob() {
  return {
    name: 'expire-sessions',
    interval: 60_000,
    handler: async (_payload: Record<string, unknown>): Promise<void> => {
      // TODO: Query address_tokens WHERE expires_at < now AND status = 'active', update to 'expired'
    },
  };
}
