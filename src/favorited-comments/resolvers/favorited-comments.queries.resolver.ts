import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PaginateInput } from 'src/common/paginate.input';
import { FavoritedCommentModel } from '../dto/favorited-comment.model';
import { PaginatedFavoritedComments } from '../dto/paginate-favorited-comment.dto';
import { FavoritedCommentsService } from '../favorited-comments.service';

@Resolver(() => FavoritedCommentModel)
export class FavoritedCommentsQueriesResolver {
  constructor(
    private readonly favoritedCommentsService: FavoritedCommentsService,
  ) {}

  @Query(() => PaginatedFavoritedComments, { name: 'favoritedComments' })
  findAllByUserId(
    @Args() options: PaginateInput,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.favoritedCommentsService.findWithPaginate(
      {
        limit: options.limit,
        page: options.page,
        route: '/',
      },
      userId,
    );
  }

  @Query(() => FavoritedCommentModel, { name: 'favoritedComment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.favoritedCommentsService.findOne(id);
  }
}
