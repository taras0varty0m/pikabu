import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import { PaginatedPosts } from '../dto/paginate-post.dto';
import { PaginateInput } from 'src/common/paginate.input';
import { PostSort } from '../dto/post-sort.enum';
import { PostFilter } from '../dto/post-filter.input';
import { PostModel } from '../dto/post.model';

@Resolver(() => PostModel)
export class PostsQueriesResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PaginatedPosts, { name: 'posts' })
  findAll(
    @Args() options: PaginateInput,
    @Args('postSort', { type: () => [PostSort], nullable: true })
    sortOptions: PostSort[],
    @Args('postFilter', { type: () => PostFilter, nullable: true })
    filterOptions: PostFilter,
    @Args('searchByTitle', { type: () => [String], nullable: true })
    search: string,
  ) {
    return this.postsService.findWithPaginate(
      options,
      sortOptions,
      filterOptions,
      search,
    );
  }

  @Query(() => PostModel, { name: 'post' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.findOne(id);
  }
}
