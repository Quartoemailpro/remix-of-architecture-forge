import { query } from '../db/pg.js';

export class InboxStore {
  async isProcessed(eventId: string): Promise<boolean> {
    const result = await query('SELECT 1 FROM event_inbox WHERE event_id = $1', [eventId]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  async markProcessed(eventId: string, eventType: string): Promise<void> {
    await query('INSERT INTO event_inbox (event_id, event_type) VALUES ($1, $2) ON CONFLICT DO NOTHING', [eventId, eventType]);
  }
}
