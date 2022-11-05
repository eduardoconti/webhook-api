import { AggregateRoot } from '../contracts';
import { AddNewRequestEvent } from '../events';
import { Method, UUID } from '../value-objects';

export type RequestEntityProps = {
  headers: string;
  body: string;
  method: Method;
  webhookId: UUID;
};
export class RequestEntity extends AggregateRoot<RequestEntityProps> {
  protected readonly _id!: UUID;

  static create(request: RequestEntityProps): RequestEntity {
    const id = UUID.generate();
    const requestEntity = new RequestEntity({ id, props: request });
    requestEntity.addEvent(
      new AddNewRequestEvent({
        aggregateId: id.value,
        method: requestEntity.props.method.value,
        body: requestEntity.props.body,
        headers: requestEntity.props.headers,
        createdAt: requestEntity.createdAt.value,
        webhookId: requestEntity.props.webhookId.value,
      }),
    );
    return requestEntity;
  }
}
