import { DomainEvent, DomainEventProps } from '../domain-events';

// DomainEvent is a plain object with properties
export class AddNewRequestEvent extends DomainEvent {
  constructor(props: DomainEventProps<AddNewRequestEvent>) {
    super(props);
    this.headers = props.headers;
    this.body = props.body;
    this.method = props.method;
    this.webhookId = props.webhookId;
    this.createdAt = props.createdAt;
  }

  readonly headers: string;
  readonly body: string;
  readonly method: string;
  readonly webhookId: string;
  readonly createdAt?: Date;
}
