import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebhookEventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('WebhookEventsGateway');

  handleDisconnect(client: any) {
    this.logger.log('handleDisconnect');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(client.id);
    this.logger.log('handleConnection');
  }

  afterInit(server: any) {
    this.logger.log('initialized');
  }
}
