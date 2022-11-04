import { DeepPartial } from '../types';
import { ID } from '../value-objects/id.value-object';
import { BaseEntityProps } from './entity';

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
