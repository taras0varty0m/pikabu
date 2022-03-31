import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetLikedCommentInput } from '../dto/get-liked-comment.dto';
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
  findOne(
    @Args('getLikedCommentInput')
    getLikedCommentInput: GetLikedCommentInput,
  ) {
    return this.likedCommentsService.findOne(getLikedCommentInput);
  }
}
