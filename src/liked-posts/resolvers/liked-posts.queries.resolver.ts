import { Resolver, Query, Args, ID } from '@nestjs/graphql';
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
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.likedPostsService.findOne(id);
  }
}
