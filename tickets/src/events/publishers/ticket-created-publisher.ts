import { Publisher, Subjects, TicketCreatedEvent } from '@fil45_ms/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated; 
}
