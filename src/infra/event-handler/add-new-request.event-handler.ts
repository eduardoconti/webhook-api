import { DateVO } from '@Domain/value-objects';
import { WebhookEventsGateway } from '@Infra/events-gateway';
import { DomainEventHandler } from '@Domain/domain-events';
import { AddNewRequestEvent } from '@Domain/events';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { NestLogger } from '../logger';

export class AddNewRequestEventHandler extends DomainEventHandler {
  constructor(
    private readonly server: WebhookEventsGateway,
    private readonly logger: NestLogger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(AddNewRequestEvent);
    this.listen();
  }

  async handle(event: AddNewRequestEvent) {
    try {
      this.logger.info(JSON.stringify(event));
      const socketId: string = await this.cacheManager.get(event.webhookId);
      const socket = await this.server.wss.sockets.sockets.get(socketId);
      await socket.emit('webhook', {
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