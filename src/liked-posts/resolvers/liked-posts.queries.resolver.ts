import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { LikedPostModel } from '../dto/liked-post.model';
import { LikedPostsService } from '../liked-posts.service';

@Resolver(() => LikedPostModel)
export class LikedPostsQueriesResolver {
  constructor(private readonly likedPostsService: LikedPostsService) {}

  @Query(() => [LikedPostModel], { name: 'likedPosts' })
  findAll() {
    return this.likedPostsService.findAll();
  }

  @Query(() => LikedPostModel, { name: 'likedPost' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likedPostsService.findOne(id);
  }
}
