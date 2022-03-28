import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FavoritedCommentModel } from 'src/favorited-comments/dto/favorited-comment.model';
import { FavoritedPostModel } from 'src/favorited-posts/dto/favorited-post.model';
import { PostModel } from 'src/posts/dto/post.model';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => [PostModel])
  posts?: PostModel[];

  @Field(() => [FavoritedPostModel])
  favoritedPosts?: FavoritedPostModel[];

  @Field(() => [FavoritedCommentModel])
  favoritedComments?: FavoritedCommentModel[];
}
