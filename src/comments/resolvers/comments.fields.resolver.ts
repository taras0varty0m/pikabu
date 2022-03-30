import { Resolver, Parent, ResolveField, Int } from '@nestjs/graphql';
import { Loader } from 'src/libs/NestDataloader';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { LikedCommentDataLoader } from 'src/liked-comments/dataloaders/liked-comments.loader';
import { LikedCommentsRepository } from 'src/liked-comments/liked-comments.repository';
import { CommentModel } from '../dto/comment.model';

@Resolver(() => CommentModel)
export class CommentsFieldsResolver {
  constructor(
    private readonly likedCommentsRepository: LikedCommentsRepository,
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
  async likes(@Parent() comment: CommentModel) {
    return this.likedCommentsRepository.getLikesByCommentId(comment.id);
  }

  @ResolveField(() => Int)
  async disLikes(@Parent() comment: CommentModel) {
    return this.likedCommentsRepository.getDisLikesByCommentId(comment.id);
  }
}
