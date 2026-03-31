export class MixSessionPresenter {
  static toResponse(data: {
    sessionId: string;
    depositAddress: string;
    status: string;
    createdAt: number;
  }) {
    return {
      sessionId: data.sessionId,
      depositAddress: data.depositAddress,
      status: data.status,
      createdAt: data.createdAt,
    };
  }

  static toListResponse(sessions: Array<{ sessionId: string; status: string; createdAt: number }>) {
    return {
      sessions: sessions.map(s => ({
        sessionId: s.sessionId,
        status: s.status,
        createdAt: s.createdAt,
      })),
      total: sessions.length,
    };
  }
}
