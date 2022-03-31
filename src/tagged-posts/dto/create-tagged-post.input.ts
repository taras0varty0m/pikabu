import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreateTaggedPostInput {
  @Field(() => ID)
  @IsDefined()
  postId: string;

  @Field(() => String)
  @IsDefined()
  title: string;
}
