import { WebhookEntity, WebhookProps } from '../entities';
import { DeepPartial } from '../types';
import { ID } from '../value-objects/id.value-object';
import { BaseEntityProps } from './entity';

/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific interfaces should be defined
    in a respective module/use case.
*/

export type QueryParams<EntityProps> = DeepPartial<
  BaseEntityProps & EntityProps
>;

export interface ISave<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface ISaveMultiple<Entity> {
  saveMultiple(entities: Entity[]): Promise<Entity[]>;
}

export interface IUpdate<Entity> {
  update(entity: Entity): Promise<Entity>;
}

export interface IFindOne<Entity, EntityProps> {
  findOne(params: QueryParams<EntityProps>): Promise<Entity>;
}

export interface IFindOneById<Entity> {
  findOneById(id: ID): Promise<Entity>;
}

export interface IFindMany<Entity, EntityProps> {
  findMany(params: QueryParams<EntityProps>): Promise<Entity[]>;
}

export interface IOrderBy {
  [key: number]: -1 | 1;
}

export interface IPaginationMeta {
  skip?: number;
  limit?: number;
  page?: number;
}

export interface IFindManyPaginatedParams<EntityProps> {
  params?: QueryParams<EntityProps>;
  pagination?: IPaginationMeta;
  orderBy?: IOrderBy;
}

export interface IDataWithPaginationMeta<T> {
  data: T;
  count: number;
  limit?: number;
  page?: number;
}

export interface IFindManyPaginated<Entity, EntityProps> {
  findManyPaginated(
    options: IFindManyPaginatedParams<EntityProps>,
  ): Promise<IDataWithPaginationMeta<Entity[]>>;
}

export interface IDeleteOne<Entity> {
  delete(entity: Entity): Promise<Entity>;
}

// export interface IRepository<Entity, EntityProps>
//   extends ISave<Entity>,
//     IFindOne<Entity, EntityProps>,
//     IFindOneById<Entity>,
//     IFindMany<Entity, EntityProps>,
//     IFindManyPaginated<Entity, EntityProps>,
//     IDeleteOne<Entity>,
//     ISaveMultiple<Entity> {
//   setCorrelationId(correlationId: string): this;
// }

export interface IWebhookRepository
  extends ISave<WebhookEntity>,
    IUpdate<WebhookEntity>,
    IFindOne<WebhookEntity, WebhookProps>,
    IFindMany<WebhookEntity, WebhookProps>,
    IFindOneById<WebhookEntity> {}
