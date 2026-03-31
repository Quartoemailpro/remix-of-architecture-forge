export interface ContactTicket {
  subject: string;
  message: string;
  ticketId: string;
}

const TICKET_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateTicketId(): string {
  let result = "TK-";
  for (let i = 0; i < 8; i++) {
    result += TICKET_CHARS.charAt(Math.floor(Math.random() * TICKET_CHARS.length));
  }
  return result;
}
