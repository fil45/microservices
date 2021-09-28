import { Publisher, Subjects, PaymentCreatedEvent } from '@fil45_ms/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated; 
}
