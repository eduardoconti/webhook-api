import { WebhookEventsGateway } from '@/infra/events-gateway';
import { TYPES } from '@/main/dependency-injection';

import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';

describe('WebhookController', () => {
  let controller: WebhookController;
  let webhookEventsGateway: WebhookEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: WebhookEventsGateway,
          useValue: {
            wss: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    webhookEventsGateway =
      module.get<WebhookEventsGateway>(WebhookEventsGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(webhookEventsGateway).toBeDefined();
  });
});
