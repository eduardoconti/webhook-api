import { DateVO } from '@Domain/value-objects';
import { WebhookEventsGateway } from '@Infra/events-gateway';
import { DomainEventHandler } from '@Domain/domain-events';
import { AddNewRequestEvent } from '@Domain/events';
import { ICacheManager, ILogger } from '@Domain/contracts';
import { BadRequestException } from '../exceptions';

export class AddNewRequestEventHandler extends DomainEventHandler {
  constructor(
    private readonly server: WebhookEventsGateway,
    private readonly logger: ILogger,
    private readonly cacheManager: ICacheManager,
  ) {
    super(AddNewRequestEvent);
    this.listen();
  }

  async handle(event: AddNewRequestEvent) {
    this.logger.info(JSON.stringify(event));
    const socketId = await this.cacheManager.get<string>(event.webhookId);
    const socket = await this.server.wss.sockets.sockets.get(socketId);
    if (!socket) {
      throw new BadRequestException('Socket not found');
    }
    await socket.emit('webhook', {
      body: event.body,
      headers: event.headers,
      time: new DateVO(event.dateOccurred).value,
      id: event.id,
      method: event.method,
    });
  }
}
