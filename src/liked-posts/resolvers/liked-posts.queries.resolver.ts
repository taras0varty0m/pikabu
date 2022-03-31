import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetLikedPostInput } from '../dto/get-liked-post.dto';
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
  findOne(
    @Args('getLikedPostInput')
    getLikedPostInput: GetLikedPostInput,
  ) {
    return this.likedPostsService.findOne(getLikedPostInput);
  }
}
