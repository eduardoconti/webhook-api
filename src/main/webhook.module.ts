import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { WebhookController } from '@Presentation/controllers';
import { WebhookEventsGateway } from '@/infra/events-gateway/webhook-events.gateway';
import { AddNewRequestEventHandler } from '@App/event-handler';
import { AddNewRequestUseCase } from '@/app/use-cases';
import { NestLogger } from '@/infra/logger';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ICacheManager, ILogger } from '@/domain/contracts';

@Module({
  controllers: [WebhookController],
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        ttl: 43200, //12h
        store: redisStore,
        url: config.get('REDIS_HOST'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    WebhookEventsGateway,
    AddNewRequestUseCase,
    NestLogger,
    {
      provide: AddNewRequestEventHandler,
      useFactory: async (
        server: WebhookEventsGateway,
        logger: ILogger,
        cache: ICacheManager,
      ) => {
        return new AddNewRequestEventHandler(server, logger, cache);
      },
      inject: [WebhookEventsGateway, NestLogger, CACHE_MANAGER],
    },
  ],
  exports: [],
})
export class WebhookModule {}
