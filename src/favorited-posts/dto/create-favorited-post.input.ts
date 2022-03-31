import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreateFavoritedPostInput {
  @Field(() => ID)
  @IsDefined()
  postId: string;
}
