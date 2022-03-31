import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CommentModel } from 'src/comments/dto/comment.model';
import { UserModel } from 'src/users/dto/user.model';

@ObjectType()
export class FavoritedCommentModel {
  @Field(() => ID)
  id: string;

  @Field(() => UserModel)
  user?: UserModel;

  @Field(() => CommentModel)
  comment?: CommentModel;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  commentId: string;
}
