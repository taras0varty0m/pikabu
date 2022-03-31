import { Type } from '@nestjs/common';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Meta {
  @Field()
  itemCount: number;
  @Field()
  totalItems: number;
  @Field()
  itemsPerPage: number;
  @Field()
  totalPages: number;
  @Field()
  currentPage: number;
}

export interface IPaginated<T> {
  items: T[];
  meta: Meta;
}

export const Paginated = <T>(classRef: Type<T>): Type<IPaginated<T>> => {
  @ObjectType({ isAbstract: true })
  class PaginatedType {
    @Field(() => [classRef])
    items: T[];

    @Field()
    meta: Meta;
  }

  return PaginatedType;
};
