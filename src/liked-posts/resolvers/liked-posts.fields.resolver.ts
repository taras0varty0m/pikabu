import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { LikedPostModel } from '../dto/liked-post.model';
import { Loader } from 'src/libs/NestDataloader';
import { PostsDataLoader } from 'src/posts/dataloaders/posts.loader';
import { UsersDataLoader } from 'src/users/dataloaders/users.loader';

@Resolver(() => LikedPostModel)
export class LikedPostsFieldsResolver {
  @ResolveField(() => UserModel)
  async user(
    @Parent() { user, userId }: LikedPostModel,
    @Loader(UsersDataLoader.name)
    usersDataLoader: ReturnType<UsersDataLoader['generateDataLoader']>,
  ) {
    if (user) return user;

    return await usersDataLoader.load(userId);
  }

  @ResolveField(() => PostModel)
  async post(
    @Parent() { post, postId }: LikedPostModel,
    @Loader(PostsDataLoader.name)
    postsDataLoader: ReturnType<PostsDataLoader['generateDataLoader']>,
  ) {
    if (post) return post;

    return await postsDataLoader.load(postId);
  }
}
