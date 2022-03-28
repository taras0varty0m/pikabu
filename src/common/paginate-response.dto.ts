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

@ObjectType()
class Links {
  @Field()
  first: string;
  @Field()
  previous: string;
  @Field()
  next: string;
  @Field()
  last: string;
}

export interface IPaginated<T> {
  items: T[];
  meta: Meta;
  links: Links;
}

export const Paginated = <T>(classRef: Type<T>): Type<IPaginated<T>> => {
  @ObjectType({ isAbstract: true })
  class PaginatedType {
    @Field(() => [classRef])
    items: T[];

    @Field()
    meta: Meta;

    @Field()
    links: Links;
  }

  return PaginatedType;
};
