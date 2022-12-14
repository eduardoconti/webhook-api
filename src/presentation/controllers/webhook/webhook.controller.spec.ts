import { AddNewRequestUseCase, IAddNewRequestUseCase } from '@/app/use-cases';
import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';

describe('WebhookController', () => {
  let controller: WebhookController;
  let addNewRequestUseCase: IAddNewRequestUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: AddNewRequestUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    addNewRequestUseCase =
      module.get<AddNewRequestUseCase>(AddNewRequestUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addNewRequestUseCase).toBeDefined();
  });
});
