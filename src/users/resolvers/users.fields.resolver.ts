import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from '../dto/user.model';
import { PostModel } from 'src/posts/dto/post.model';
import { UserLoaders } from '../users.loader';

@Resolver(() => UserModel)
export class UsersFieldsResolver {
  constructor(private readonly userLoaders: UserLoaders) {}

  @ResolveField(() => [PostModel])
  posts(@Parent() { id, posts }: UserModel) {
    if (posts) return posts;
    return this.userLoaders.batchPosts.load(id);
  }

  @ResolveField(() => [PostModel])
  favoritedPosts(@Parent() { id, favoritedPosts }: UserModel) {
    if (favoritedPosts) return favoritedPosts;
    return this.userLoaders.batchFavoritedPosts.load(id);
  }

  @ResolveField(() => [PostModel])
  favoritedComments(@Parent() { id, favoritedComments }: UserModel) {
    if (favoritedComments) return favoritedComments;
    return this.userLoaders.batchFavoritedComments.load(id);
  }
}
