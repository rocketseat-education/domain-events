import { DomainEvent } from "../../core/DomainEvent";
import { Order } from "./order";

export class OrderPaidEvent implements DomainEvent {
  public createdAt: Date
  public order: Order

  constructor(order: Order) {
    this.createdAt = new Date();
    this.order = order
  }

  getEntityId(): string {
    return this.order.id
  }
}