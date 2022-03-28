import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';

@ObjectType()
export class CommentModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => Int)
  postId: number;

  @Field(() => [String])
  images?: string[];

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  disLikes: number;

  @Field(() => [LikedCommentModel])
  likedComments?: LikedCommentModel[];
}
