import { Entity } from "./Entity";

type SubscriberCallback = (event: any) => void;
type Subscribers = Record<string, SubscriberCallback[]>

export class DomainEvents {
  static subscribers: Subscribers = {}
  static markedEntitiesToDispatch: Entity<any>[] = []

  public static registerSubscriber(
    event: string,
    callback: SubscriberCallback,
  ) {
    if (event in this.subscribers) {
      this.subscribers[event].push(callback)
    } else {
      this.subscribers[event] = [callback]
    }
  }

  public static markEntityForDispatch(entity: Entity<any>) {
    const alreadyMarked = this.markedEntitiesToDispatch.find(item => item.id === entity.id)

    if (!alreadyMarked) {
      this.markedEntitiesToDispatch.push(entity)
    }
  }

  public static dispatchEventsForEntity(id: string) {
    const entity = this.markedEntitiesToDispatch.find(item => item.id === id)

    if (entity) {
      entity.domainEvents.forEach((event) => {
        const eventClassName = event.constructor.name

        if (eventClassName in this.subscribers) {
          const handlers = this.subscribers[eventClassName]

          for (const handler of handlers) {
            handler(event)
          }
        }
      })

      entity.clearEvents()
    }
  }
}