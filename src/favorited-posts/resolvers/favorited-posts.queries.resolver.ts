import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetWithPaginateByUserIdInput } from 'src/common/get-with-paginate-by-user-id.dto';
import { FavoritedPostModel } from '../dto/favorited-post.model';
import { GetFavoritedPostInput } from '../dto/get-favorited-post.dto';
import { PaginatedFavoritedPosts } from '../dto/paginate-favorited-posts.dto';
import { FavoritedPostsService } from '../favorited-posts.service';

@Resolver(() => FavoritedPostModel)
export class FavoritedPostsQueriesResolver {
  constructor(private readonly favoritedPostsService: FavoritedPostsService) {}

  @Query(() => PaginatedFavoritedPosts, { name: 'favoritedPosts' })
  findAllByUserId(
    @Args('getFavoritedPostsWithPaginateByUserIdInput')
    getWithPaginateByUserIdInput: GetWithPaginateByUserIdInput,
  ) {
    return this.favoritedPostsService.findWithPaginate(
      getWithPaginateByUserIdInput,
    );
  }

  @Query(() => FavoritedPostModel, { name: 'favoritedPost' })
  findOne(
    @Args('getFavoritedPostInput')
    getFavoritedPostInput: GetFavoritedPostInput,
  ) {
    return this.favoritedPostsService.findOne(getFavoritedPostInput);
  }
}
