import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from '../dto/user.model';
import { PostModel } from 'src/posts/dto/post.model';
import { UsersFavoritedPostDataLoader } from 'src/users/dataloaders/users-favorited-posts.loader';
import { Loader } from 'src/libs/NestDataloader';
import { FavoritedPostModel } from 'src/favorited-posts/dto/favorited-post.model';
import { FavoritedCommentModel } from 'src/favorited-comments/dto/favorited-comment.model';
import { UsersFavoritedCommentDataLoader } from 'src/users/dataloaders/users-favorited-comments.loader';
import { UsersPostDataLoader } from '../dataloaders/users-posts.loader';

@Resolver(() => UserModel)
export class UsersFieldsResolver {
  @ResolveField(() => [PostModel])
  async posts(
    @Parent() { id, posts }: UserModel,
    @Loader(UsersPostDataLoader.name)
    usersPostDataLoader: ReturnType<UsersPostDataLoader['generateDataLoader']>,
  ) {
    if (posts) return posts;

    return await usersPostDataLoader.load(id);
  }

  @ResolveField(() => [FavoritedPostModel])
  async favoritedPosts(
    @Parent() { id, favoritedPosts }: UserModel,
    @Loader(UsersFavoritedPostDataLoader.name)
    favoritedPostDataLoader: ReturnType<
      UsersFavoritedPostDataLoader['generateDataLoader']
    >,
  ) {
    if (favoritedPosts) return favoritedPosts;

    return await favoritedPostDataLoader.load(id);
  }

  @ResolveField(() => [FavoritedCommentModel])
  async favoritedComments(
    @Parent() { id, favoritedComments }: UserModel,
    @Loader(UsersFavoritedCommentDataLoader.name)
    favoritedCommentDataLoader: ReturnType<
      UsersFavoritedCommentDataLoader['generateDataLoader']
    >,
  ) {
    if (favoritedComments) return favoritedComments;
    const comments = await favoritedCommentDataLoader.load(id);

    return comments;
  }
}
