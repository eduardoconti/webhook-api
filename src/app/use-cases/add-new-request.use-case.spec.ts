import { AddNewRequestUseCase, IAddNewRequestUseCase } from '@/app/use-cases';
import { Test, TestingModule } from '@nestjs/testing';

describe('WebhookController', () => {
  let addNewRequestUseCase: IAddNewRequestUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddNewRequestUseCase],
    }).compile();

    addNewRequestUseCase =
      module.get<AddNewRequestUseCase>(AddNewRequestUseCase);
  });

  it('should be defined', () => {
    expect(addNewRequestUseCase).toBeDefined();
  });

  it('should execute successfuly', async () => {
    await expect(
      addNewRequestUseCase.execute({
        body: '123',
        headers: '123',
        method: 'post',
        webhookId: '1497aa6a-abcf-48be-82f3-3b74cf5b2e7f',
      }),
    ).toBeDefined();
  });
});
