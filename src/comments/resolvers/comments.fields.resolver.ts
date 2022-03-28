import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { CommentLoaders } from '../comments.loader';
import { CommentModel } from '../dto/comment.model';

@Resolver(() => CommentModel)
export class CommentsFieldsResolver {
  constructor(private readonly commentLoaders: CommentLoaders) {}

  @ResolveField(() => [LikedCommentModel])
  likedComments(@Parent() { id, likedComments }: CommentModel) {
    if (likedComments) return likedComments;
    return this.commentLoaders.batchCommentLikes.load(id);
  }
}
