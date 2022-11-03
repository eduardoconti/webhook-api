import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebhookModule } from './webhook.module';
import { AppController } from '@Presentation/controllers';
import { Shutdown } from '@Infra/shutdown/shutdown';
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [Shutdown],
})
export class AppModule {}
