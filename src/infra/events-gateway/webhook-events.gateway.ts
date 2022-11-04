import { ILogger } from '@/domain/contracts';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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
}
