import { Module } from '@nestjs/common';
import { WebhookController } from '@Presentation/controllers';
import { WebhookEventsGateway } from '@/infra/events-gateway/webhook-events.gateway';
@Module({
  controllers: [WebhookController],
  providers: [WebhookEventsGateway],
  exports: [],
})
export class WebhookModule {}
