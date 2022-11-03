import { Entity } from '../contracts';
import { Name, UUID } from '../value-objects';
import { Request } from './request.entity';

export type WebhookProps = {
  name: Name;
  description: string;
  requests?: Request[];
};

export class WebhookEntity extends Entity<WebhookProps> {
  protected readonly _id!: UUID;

  static create(props: WebhookProps): WebhookEntity {
    const id = UUID.generate();
    const webhook = new WebhookEntity({ id, props });

    return webhook;
  }
}
