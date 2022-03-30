import { Resolver, Parent, ResolveField, Int } from '@nestjs/graphql';
import { Loader } from 'src/libs/NestDataloader';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { LikedCommentDataLoader } from 'src/liked-comments/dataloaders/liked-comments.loader';
import { CommentModel } from '../dto/comment.model';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CommentLikesDataLoader } from '../dataloaders/comment-likes.loader';
import { CommentDisLikesDataLoader } from '../dataloaders/comment-dislikes.loader';

@Resolver(() => CommentModel)
export class CommentsFieldsResolver {
  constructor(
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
  async likes(
    @Parent() { id, likes }: CommentModel,
    @Loader(CommentLikesDataLoader.name)
    commentLikesDataLoader: ReturnType<
      CommentLikesDataLoader['generateDataLoader']
    >,
  ) {
    if (likes) return likes;

    return (await commentLikesDataLoader.load(id)).length;
  }

  @ResolveField(() => Int)
  async disLikes(
    @Parent() { id, likes }: CommentModel,
    @Loader(CommentDisLikesDataLoader.name)
    commentDisLikesDataLoader: ReturnType<
      CommentDisLikesDataLoader['generateDataLoader']
    >,
  ) {
    if (likes) return likes;

    return (await commentDisLikesDataLoader.load(id)).length;
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
