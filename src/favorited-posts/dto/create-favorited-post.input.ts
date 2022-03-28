import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreateFavoritedPostInput {
  @Field(() => Int)
  @IsDefined()
  postId: number;
}
