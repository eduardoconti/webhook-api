import { AddNewWebhookUseCase, IAddNewWebhookUseCase } from '@/app/use-cases';
import { TYPES } from '@/main/dependency-injection';
import { provideAddNewWebhookUseCase } from '@/main/webhook.provider';
import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';

describe('WebhookController', () => {
  let controller: WebhookController;
  let addNewWebhookUseCase: IAddNewWebhookUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: TYPES.AddNewWebhookUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    addNewWebhookUseCase = module.get<AddNewWebhookUseCase>(
      TYPES.AddNewWebhookUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addNewWebhookUseCase).toBeDefined();
  });
});
