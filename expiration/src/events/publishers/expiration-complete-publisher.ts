import { Publisher, Subjects, ExpirationCompleteEvent } from '@fil45_ms/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete; 
}