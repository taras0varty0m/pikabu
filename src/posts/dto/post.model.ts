import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentModel } from 'src/comments/dto/comment.model';
import { LikedPostModel } from 'src/liked-posts/dto/liked-post.model';

@ObjectType()
export class PostModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

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

  @Field(() => [CommentModel])
  comments?: CommentModel[];

  @Field(() => [LikedPostModel])
  likedPosts?: LikedPostModel[];
}
