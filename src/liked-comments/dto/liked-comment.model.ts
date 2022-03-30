import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CommentModel } from 'src/comments/dto/comment.model';
import { TypeLike } from 'src/common/type-like.enum';
import { UserModel } from 'src/users/dto/user.model';

@ObjectType()
export class LikedCommentModel {
  @Field(() => ID)
  id: string;

  @Field(() => UserModel)
  user?: UserModel;

  @Field(() => CommentModel)
  comment?: CommentModel;

  @Field(() => ID)
  userId: string;

  @Field(() => TypeLike)
  type: TypeLike;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => ID)
  commentId: string;
}
