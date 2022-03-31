import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => ID)
  postId: string;

  @Field(() => PostModel)
  post?: PostModel;

  @Field(() => UserModel)
  user?: UserModel;

  @Field(() => [String])
  images: string[];

  @Field(() => ID)
  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  likes?: number;

  @Field(() => Int)
  disLikes?: number;

  @Field(() => [LikedCommentModel])
  likedComments?: LikedCommentModel[];
}
