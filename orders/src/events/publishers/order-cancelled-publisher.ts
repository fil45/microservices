import { Publisher, Subjects, OrderCancelledEvent } from '@fil45_ms/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled; 
}