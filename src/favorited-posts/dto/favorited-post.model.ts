import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FavoritedPostModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;
}
