import { generateTicketId } from "../domain/contact-ticket";
import { isContactFormValid } from "../domain/contact-policies";
import type { ContactTicket } from "../domain/contact-ticket";

export interface CreateTicketResult {
  success: boolean;
  ticket?: ContactTicket;
}

export function createContactTicket(subject: string, message: string): CreateTicketResult {
  if (!isContactFormValid(subject, message)) {
    return { success: false };
  }

  return {
    success: true,
    ticket: {
      subject,
      message,
      ticketId: generateTicketId(),
    },
  };
}
