import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginateInput {
  @Field(() => Int)
  @Min(1)
  page = 1;

  @Field(() => Int)
  @Min(1)
  @Max(100)
  limit = 25;
}
