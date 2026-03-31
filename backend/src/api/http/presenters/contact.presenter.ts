export class ContactPresenter {
  static toResponse(data: { ticketId: string; status: string }) {
    return { ticketId: data.ticketId, status: data.status };
  }
}
