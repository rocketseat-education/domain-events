import { Order } from "../bounded-contexts/sales/order";
import { OrderCreatedEvent } from "../bounded-contexts/sales/order-created";
import { OrderPaidEvent } from "../bounded-contexts/sales/order-paid";
import { DomainEvents } from "../core/DomainEvents";

// Subscribers
DomainEvents.registerSubscriber(
  OrderCreatedEvent.name,
  () => {
    console.log('comprou')
  },
)

DomainEvents.registerSubscriber(
  OrderPaidEvent.name,
  () => {
    console.log('pago')
  },
)

// Publisher
const order = Order.create({
  customerId: 'customer-1',
  productId: 'product-1',
  amountInCents: 1000,
  status: 'pending',
  createdAt: new Date(),
})

order.pay()

// Dentro da camada de persistência (repositório / active record)
// Atestado de finalização do processo de venda

DomainEvents.dispatchEventsForEntity(order.id)