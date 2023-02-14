import { Entity } from "../../core/Entity";
import { OrderCreatedEvent } from "./order-created";
import { OrderPaidEvent } from "./order-paid";

interface OrderProps {
  customerId: string;
  productId: string;
  amountInCents: number;
  status: 'pending' | 'paid';
  createdAt: Date;
}

export class Order extends Entity<OrderProps> {
  get customerId() {
    return this.props.customerId
  }

  get productId() {
    return this.props.productId
  }

  get amountInCents() {
    return this.props.amountInCents
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  public pay() {
    this.props.status = 'paid'

    this.addDomainEvent(new OrderPaidEvent(this))
  }

  static create(props: OrderProps, id?: string) {
    const order = new Order(props, id)

    if (!id) {
      order.addDomainEvent(new OrderCreatedEvent(order))
    }

    return order
  }
} 