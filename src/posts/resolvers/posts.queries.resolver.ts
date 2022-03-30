import { Resolver, Query, Args } from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import { PaginatedPosts } from '../dto/paginate-post.dto';
import { PostModel } from '../dto/post.model';
import { GetPostsInput } from '../dto/get-posts.dto';
import { GetPostInput } from '../dto/get-post.dto';

@Resolver(() => PostModel)
export class PostsQueriesResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PaginatedPosts, { name: 'posts' })
  findAll(
    @Args('getPostsWithPaginateAndFilterAndSearchByTitleByUserIdInput')
    getPostsInput: GetPostsInput,
  ) {
    return this.postsService.findWithPaginate(getPostsInput);
  }

  @Query(() => PostModel, { name: 'post' })
  findOne(
    @Args('getPostInput')
    getPostInput: GetPostInput,
  ) {
    return this.postsService.findOne(getPostInput);
  }
}
