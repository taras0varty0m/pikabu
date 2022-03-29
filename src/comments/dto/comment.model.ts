import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => ID)
  postId: string;

  @Field(() => [String])
  images?: string[];

  @Field(() => ID)
  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  likes?: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  disLikes?: number;

  @Field(() => [LikedCommentModel])
  likedComments?: LikedCommentModel[];
}
