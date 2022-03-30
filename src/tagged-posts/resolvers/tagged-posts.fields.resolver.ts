import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { UsersRepository } from 'src/users/users.repository';
import { TaggedPostModel } from '../dto/tagged-post.model';

@Resolver(() => TaggedPostModel)
export class TaggedPostsFieldsResolver {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @ResolveField(() => UserModel)
  user(@Parent() taggedPost: TaggedPostModel) {
    return this.usersRepository.findOne(taggedPost.userId);
  }

  @ResolveField(() => PostModel)
  post(@Parent() taggedPost: TaggedPostModel) {
    return this.postsRepository.findOne(taggedPost.postId);
  }
}
