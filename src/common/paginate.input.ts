import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PaginateInput {
  @Field(() => Int)
  @Min(1)
  page = 1;

  @Field(() => Int)
  @Min(1)
  @Max(100)
  limit = 25;
}
