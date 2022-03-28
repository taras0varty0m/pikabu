import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { PaginateInput } from 'src/common/paginate.input';
import { FavoritedPostModel } from '../dto/favorited-post.model';
import { PaginatedFavoritedPosts } from '../dto/paginate-favorited-posts.dto';
import { FavoritedPostsService } from '../favorited-posts.service';

@Resolver(() => FavoritedPostModel)
export class FavoritedPostsQueriesResolver {
  constructor(private readonly favoritedPostsService: FavoritedPostsService) {}

  @Query(() => PaginatedFavoritedPosts, { name: 'favoritedPosts' })
  findAllByUserId(
    @Args() options: PaginateInput,
    @Args('userId', { type: () => ID }) userId: string,
  ) {
    return this.favoritedPostsService.findWithPaginate(
      {
        limit: options.limit,
        page: options.page,
        route: '/',
      },
      userId,
    );
  }

  @Query(() => FavoritedPostModel, { name: 'favoritedPost' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.favoritedPostsService.findOne(id);
  }
}
