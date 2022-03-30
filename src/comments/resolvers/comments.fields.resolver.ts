import { Resolver, Parent, ResolveField, Int } from '@nestjs/graphql';
import { Loader } from 'src/libs/NestDataloader';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { LikedCommentDataLoader } from 'src/liked-comments/dataloaders/liked-comments.loader';
import { LikedCommentsRepository } from 'src/liked-comments/liked-comments.repository';
import { CommentModel } from '../dto/comment.model';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';

@Resolver(() => CommentModel)
export class CommentsFieldsResolver {
  constructor(
    private readonly likedCommentsRepository: LikedCommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @ResolveField(() => [LikedCommentModel])
  async likedComments(
    @Parent() { id, likedComments }: CommentModel,
    @Loader(LikedCommentDataLoader.name)
    likedCommentDataLoader: ReturnType<
      LikedCommentDataLoader['generateDataLoader']
    >,
  ) {
    if (likedComments) return likedComments;

    return await likedCommentDataLoader.load(id);
  }

  @ResolveField(() => Int)
  likes(@Parent() comment: CommentModel) {
    return this.likedCommentsRepository.getLikesByCommentId(comment.id);
  }

  @ResolveField(() => Int)
  disLikes(@Parent() comment: CommentModel) {
    return this.likedCommentsRepository.getDisLikesByCommentId(comment.id);
  }

  @ResolveField(() => PostModel)
  post(@Parent() comment: CommentModel) {
    return this.postsRepository.findOne(comment.postId);
  }

  @ResolveField(() => UserModel)
  user(@Parent() comment: CommentModel) {
    return this.usersRepository.findOne(comment.userId);
  }
}
