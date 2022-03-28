import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TypeLike } from 'src/common/type-like.enum';

@ObjectType()
export class LikedCommentModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => TypeLike)
  type: TypeLike;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => ID)
  commentId: string;
}
