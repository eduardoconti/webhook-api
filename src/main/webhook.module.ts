import { Module } from '@nestjs/common';
import { WebhookController } from '@Presentation/controllers';
import { WebhookEventsGateway } from '@/infra/events-gateway/webhook-events.gateway';
import { AddNewRequestEventHandler } from '@Infra/event-handler';
import { AddNewRequestUseCase } from '@/app/use-cases';
import { NestLogger } from '@/infra/logger';
import { ILogger } from '@Domain/contracts';
@Module({
  controllers: [WebhookController],
  providers: [
    WebhookEventsGateway,
    AddNewRequestUseCase,
    NestLogger,
    {
      provide: AddNewRequestEventHandler,
      useFactory(server: WebhookEventsGateway) {
        const logger = new NestLogger('AddNewRequestEventHandler');
        const handler = new AddNewRequestEventHandler(server, logger);
        handler.listen();
        return handler;
      },
      inject: [WebhookEventsGateway],
    },
  ],
  exports: [],
})
export class WebhookModule {}
