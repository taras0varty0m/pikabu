import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class FavoritedCommentModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  commentId: string;
}
