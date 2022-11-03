import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { WebhookController } from '@Presentation/controllers';
import { provideWebhookLogger } from './webhook.provider';
import { WebhookEventsGateway } from '@/presentation/controllers/webhook/webhook-events.gateway';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'JOB',
    }),
  ],

  controllers: [WebhookController],

  providers: [provideWebhookLogger, WebhookEventsGateway],
  exports: [],
})
export class WebhookModule {}
