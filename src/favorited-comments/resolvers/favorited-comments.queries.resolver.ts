import { Resolver, Query, Args } from '@nestjs/graphql';
import { FavoritedCommentModel } from '../dto/favorited-comment.model';
import { GetFavoritedCommentInput } from '../dto/get-favorited-comment.dto';
import { GetWithPaginateByUserIdInput } from '../../common/get-with-paginate-by-user-id.dto';
import { PaginatedFavoritedComments } from '../dto/paginate-favorited-comment.dto';
import { FavoritedCommentsService } from '../favorited-comments.service';

@Resolver(() => FavoritedCommentModel)
export class FavoritedCommentsQueriesResolver {
  constructor(
    private readonly favoritedCommentsService: FavoritedCommentsService,
  ) {}

  @Query(() => PaginatedFavoritedComments, { name: 'favoritedComments' })
  findAllByUserId(
    @Args('getFavoritedCommentsWithPaginateByUserIdInput')
    getWithPaginateByUserIdInput: GetWithPaginateByUserIdInput,
  ) {
    return this.favoritedCommentsService.findWithPaginate(
      getWithPaginateByUserIdInput,
    );
  }

  @Query(() => FavoritedCommentModel, { name: 'favoritedComment' })
  findOne(
    @Args('getFavoritedCommentInput')
    getFavoritedCommentInput: GetFavoritedCommentInput,
  ) {
    return this.favoritedCommentsService.findOne(getFavoritedCommentInput);
  }
}
