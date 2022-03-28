import { Resolver, Query, Args, ID } from '@nestjs/graphql';
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
    @Args('userId', { type: () => ID }) userId: string,
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
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.favoritedCommentsService.findOne(id);
  }
}
