import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class GetTaggedPostInput {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
