import { ILogger } from '@/domain/contracts';
import { CacheKey, CACHE_MANAGER, Inject } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server } from 'socket.io';
import { NestLogger } from '../logger';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebhookEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  @WebSocketServer() wss: Server;
  private logger: ILogger = new NestLogger('WebhookEventsGateway');

  handleDisconnect(client: any) {
    this.logger.info(`handleDisconnect: ${client.id} `);
  }

  handleConnection(client: any) {
    this.logger.info(`handleConnection: ${client.id} `);
  }

  afterInit() {
    this.logger.info('initialized');
  }

  @SubscribeMessage('register')
  async handleEvent(
    @MessageBody() data: { webHookId: string; socketId: string },
  ): Promise<void> {
    await this.cacheManager.set(data.webHookId, data.socketId, 0);
  }
}
