import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TypeLike } from 'src/common/type-like.enum';

@ObjectType()
export class LikedPostModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => TypeLike)
  type: TypeLike;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  postId: number;
}
