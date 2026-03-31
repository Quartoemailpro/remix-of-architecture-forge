export class AdminController {
  async listSessions() {
    // TODO: query active sessions
    return { sessions: [], total: 0 };
  }

  async revokeSession(sessionId: string) {
    // TODO: call revoke use case
    return { status: 'revoked', sessionId };
  }

  async poolStatus() {
    // TODO: query liquidity pool
    return { totalBalance: 0, availableBalance: 0, reservedBalance: 0 };
  }
}
