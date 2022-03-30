import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { UsersRepository } from 'src/users/users.repository';
import { LikedPostModel } from '../dto/liked-post.model';

@Resolver(() => LikedPostModel)
export class LikedPostsFieldsResolver {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @ResolveField(() => UserModel)
  user(@Parent() likedPost: LikedPostModel) {
    return this.usersRepository.findOne(likedPost.userId);
  }

  @ResolveField(() => PostModel)
  post(@Parent() likedPost: LikedPostModel) {
    return this.postsRepository.findOne(likedPost.postId);
  }
}
