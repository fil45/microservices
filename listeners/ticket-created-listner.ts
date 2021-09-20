import { Listener, Subjects, TicketCreatedEvent } from '@fil45_ms/common';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListner extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log("Event data", data);
    msg.ack();
  }
}