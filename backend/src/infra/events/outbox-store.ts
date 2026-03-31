import { query } from '../db/pg.js';

export class OutboxStore {
  async store(eventType: string, payload: Record<string, unknown>, occurredAt: number): Promise<void> {
    await query(
      'INSERT INTO event_outbox (event_type, payload, occurred_at) VALUES ($1, $2, $3)',
      [eventType, JSON.stringify(payload), occurredAt]
    );
  }

  async fetchUnpublished(limit = 50): Promise<Array<{ id: string; event_type: string; payload: Record<string, unknown> }>> {
    const result = await query<{ id: string; event_type: string; payload: Record<string, unknown> }>(
      'SELECT id, event_type, payload FROM event_outbox WHERE published = false ORDER BY occurred_at LIMIT $1',
      [limit]
    );
    return result.rows;
  }

  async markPublished(id: string): Promise<void> {
    await query('UPDATE event_outbox SET published = true, published_at = $1 WHERE id = $2', [Date.now(), id]);
  }
}
