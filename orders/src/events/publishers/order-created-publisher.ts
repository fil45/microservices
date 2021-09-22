import { Publisher, Subjects, OrderCreatedEvent } from '@fil45_ms/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated; 
}
