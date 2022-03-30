import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { CommentModel } from 'src/comments/dto/comment.model';
import { LikedPostModel } from 'src/liked-posts/dto/liked-post.model';

@ObjectType()
export class PostModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [String])
  images: string[];

  @Field(() => Int, { nullable: true })
  likes?: number;

  @Field(() => Int, { nullable: true })
  disLikes?: number;

  @Field(() => [CommentModel])
  comments?: CommentModel[];

  @Field(() => [LikedPostModel])
  likedPosts?: LikedPostModel[];
}
