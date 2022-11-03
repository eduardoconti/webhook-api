import { Entity } from '../contracts';
import { UUID } from '../value-objects';

export type RequestProps = {
  body: string;
  headers: string;
  webhookId: string;
};

export class Request extends Entity<RequestProps> {
  protected readonly _id!: UUID;

  static build(request: RequestProps): Request {
    const id = UUID.generate();
    return new Request({ id, props: request });
  }
}
