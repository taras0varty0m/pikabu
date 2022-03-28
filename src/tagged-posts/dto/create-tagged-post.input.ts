import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreateTaggedPostInput {
  @Field(() => Int)
  @IsDefined()
  postId: number;

  @Field(() => String)
  @IsDefined()
  title: string;
}
