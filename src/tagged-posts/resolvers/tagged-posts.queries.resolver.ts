import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { TaggedPostsService } from '../tagged-posts.service';
import { TaggedPostModel } from '../dto/tagged-post.model';

@Resolver(() => TaggedPostModel)
export class TaggedPostsQueriesResolver {
  constructor(private readonly taggedPostsService: TaggedPostsService) {}

  @Query(() => [TaggedPostModel], { name: 'taggedPosts' })
  findAll() {
    return this.taggedPostsService.findAll();
  }

  @Query(() => TaggedPostModel, { name: 'taggedPost' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taggedPostsService.findOne(id);
  }
}
