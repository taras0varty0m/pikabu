import { Resolver, Query, Args } from '@nestjs/graphql';
import { TaggedPostsService } from '../tagged-posts.service';
import { TaggedPostModel } from '../dto/tagged-post.model';
import { GetTaggedPostInput } from '../dto/get-tagged-post.dto';

@Resolver(() => TaggedPostModel)
export class TaggedPostsQueriesResolver {
  constructor(private readonly taggedPostsService: TaggedPostsService) {}

  @Query(() => [TaggedPostModel], { name: 'taggedPosts' })
  findAll() {
    return this.taggedPostsService.findAll();
  }

  @Query(() => TaggedPostModel, { name: 'taggedPost' })
  findOne(
    @Args('getTaggedPostInput')
    getTaggedPostInput: GetTaggedPostInput,
  ) {
    return this.taggedPostsService.findOne(getTaggedPostInput);
  }
}
