import { Module } from '@nestjs/common';
import { WebhookModule } from './webhook.module';
import { AppController } from '@Presentation/controllers';
import { Shutdown } from '@Infra/shutdown/shutdown';
@Module({
  imports: [WebhookModule],
  controllers: [AppController],
  providers: [Shutdown],
})
export class AppModule {}
