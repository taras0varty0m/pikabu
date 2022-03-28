import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FavoritedCommentModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  commentId: number;
}
