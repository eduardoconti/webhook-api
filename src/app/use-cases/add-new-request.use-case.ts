import { IUseCase } from '@/domain/contracts/use-case';
import { DomainEvents } from '@/domain/domain-events';
import { RequestEntity } from '@/domain/entities/request.entity';
import { Method, UUID } from '@/domain/value-objects';

export type AddNewRequestUseCaseInput = {
  headers: string;
  body: string;
  method: string;
  webhookId: string;
};

export type IAddNewRequestUseCase = IUseCase<AddNewRequestUseCaseInput, void>;
export class AddNewRequestUseCase implements IAddNewRequestUseCase {
  async execute(request: AddNewRequestUseCaseInput) {
    const entity = RequestEntity.create({
      body: request.body,
      headers: request.headers,
      method: new Method(request.method),
      webhookId: new UUID(request.webhookId),
    });

    await DomainEvents.publishEvents(entity.id);
  }
}
