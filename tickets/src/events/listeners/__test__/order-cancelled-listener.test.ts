import { OrderCancelledEvent, OrderStatus } from "@fil45_ms/common";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from "../../../models/ticket";
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  ticket.set({ orderId })
  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    }
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { orderId, ticket, listener, data, msg };
}

it('updates the ticket', async () => {
  const { orderId, ticket, listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
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

  expect(ticketUpdatedData.orderId).not.toBeDefined();
});