import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { TaggedPostModel } from '../dto/tagged-post.model';
import { Loader } from 'src/libs/NestDataloader';
import { UsersDataLoader } from 'src/users/dataloaders/users.loader';
import { PostsDataLoader } from 'src/posts/dataloaders/posts.loader';

@Resolver(() => TaggedPostModel)
export class TaggedPostsFieldsResolver {
  @ResolveField(() => UserModel)
  async user(
    @Parent() { user, userId }: TaggedPostModel,
    @Loader(UsersDataLoader.name)
    usersDataLoader: ReturnType<UsersDataLoader['generateDataLoader']>,
  ) {
    if (user) return user;

    return await usersDataLoader.load(userId);
  }

  @ResolveField(() => PostModel)
  async post(
    @Parent() { post, postId }: TaggedPostModel,
    @Loader(PostsDataLoader.name)
    postsDataLoader: ReturnType<PostsDataLoader['generateDataLoader']>,
  ) {
    if (post) return post;

    return await postsDataLoader.load(postId);
  }
}
