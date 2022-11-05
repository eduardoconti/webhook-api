import { DateVO } from '@Domain/value-objects';
import { WebhookEventsGateway } from '@Infra/events-gateway';
import { DomainEventHandler } from '@Domain/domain-events';
import { AddNewRequestEvent } from '@Domain/events';
import { ILogger } from '@Domain/contracts';

export class AddNewRequestEventHandler extends DomainEventHandler {
  constructor(
    private readonly server: WebhookEventsGateway,
    private readonly logger: ILogger,
  ) {
    super(AddNewRequestEvent);
  }

  async handle(event: AddNewRequestEvent) {
    try {
      this.logger.info(JSON.stringify(event));
      await this.server.wss.emit(event.webhookId, {
        body: event.body,
        headers: event.headers,
        time: new DateVO(event.dateOccurred).value,
        id: event.id,
        method: event.method,
      });
    } catch (error: any) {
      this.logger.info(JSON.stringify(error));
    }
  }
}
