import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { LikedCommentModel } from '../dto/liked-comment.model';
import { LikedCommentsService } from '../liked-comments.service';

@Resolver(() => LikedCommentModel)
export class LikedCommentsQueriesResolver {
  constructor(private readonly likedCommentsService: LikedCommentsService) {}

  @Query(() => [LikedCommentModel], { name: 'likedComments' })
  findAll() {
    return this.likedCommentsService.findAll();
  }

  @Query(() => LikedCommentModel, { name: 'likedComment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.likedCommentsService.findOne(id);
  }
}
