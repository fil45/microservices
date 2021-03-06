import { OrderCreatedEvent, OrderStatus } from "@fil45_ms/common";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from "../../../models/ticket";
import { OrderCreatedListener } from '../order-created-listener';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: mongoose.Types.ObjectId().toHexString(),
    expiresAt: 'sadsadasdsad',
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { ticket, listener, data, msg };
}

it('sets the orderId of the ticket', async () => {
  const { ticket, listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
  const { ticket, listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});