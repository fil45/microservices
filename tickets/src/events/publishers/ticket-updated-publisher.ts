import { Publisher, Subjects, TicketUpdatedEvent } from '@fil45_ms/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated; 
}
