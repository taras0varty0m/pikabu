import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { Loader } from 'src/libs/NestDataloader';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { LikedCommentDataLoader } from 'src/liked-comments/liked-comments.loader';
import { CommentModel } from '../dto/comment.model';

@Resolver(() => CommentModel)
export class CommentsFieldsResolver {
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
}
