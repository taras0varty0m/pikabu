import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { UsersRepository } from 'src/users/users.repository';
import { FavoritedPostModel } from '../dto/favorited-post.model';

@Resolver(() => FavoritedPostModel)
export class FavoritedPostsFieldsResolver {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @ResolveField(() => UserModel)
  user(@Parent() favoritedPost: FavoritedPostModel) {
    return this.usersRepository.findOne(favoritedPost.userId);
  }

  @ResolveField(() => PostModel)
  post(@Parent() favoritedPost: FavoritedPostModel) {
    return this.postsRepository.findOne(favoritedPost.postId);
  }
}
