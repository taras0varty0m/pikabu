import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from '../dto/user.model';
import { PostModel } from 'src/posts/dto/post.model';
import { FavoritedPostDataLoader } from 'src/favorited-posts/favorited-posts.loader';
import { Loader } from 'src/libs/NestDataloader';
import { FavoritedPostModel } from 'src/favorited-posts/dto/favorited-post.model';
import { FavoritedCommentModel } from 'src/favorited-comments/dto/favorited-comment.model';
import { FavoritedCommentDataLoader } from 'src/favorited-comments/favorited-comments.loader';
import { PostDataLoader } from 'src/posts/posts.loader';

@Resolver(() => UserModel)
export class UsersFieldsResolver {
  @ResolveField(() => [PostModel])
  async posts(
    @Parent() { id, posts }: UserModel,
    @Loader(PostDataLoader.name)
    postDataLoader: ReturnType<PostDataLoader['generateDataLoader']>,
  ) {
    if (posts) return posts;
    return await postDataLoader.load(id);
  }

  @ResolveField(() => [FavoritedPostModel])
  async favoritedPosts(
    @Parent() { id, favoritedPosts }: UserModel,
    @Loader(FavoritedPostDataLoader.name)
    favoritedPostDataLoader: ReturnType<
      FavoritedPostDataLoader['generateDataLoader']
    >,
  ) {
    if (favoritedPosts) return favoritedPosts;
    return await favoritedPostDataLoader.load(id);
  }

  @ResolveField(() => [FavoritedCommentModel])
  async favoritedComments(
    @Parent() { id, favoritedComments }: UserModel,
    @Loader(FavoritedCommentDataLoader.name)
    favoritedCommentDataLoader: ReturnType<
      FavoritedCommentDataLoader['generateDataLoader']
    >,
  ) {
    if (favoritedComments) return favoritedComments;
    const comments = await favoritedCommentDataLoader.load(id);
    return comments;
  }
}
