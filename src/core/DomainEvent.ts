export interface DomainEvent {
  createdAt: Date;
  getEntityId(): string;
}