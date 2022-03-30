import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { CreateLikedPostInput } from '../dto/create-liked-post.input';
import { LikedPostModel } from '../dto/liked-post.model';
import { EditLikedPostsGuard } from '../edit-liked-posts.guard';
import { LikedPostsService } from '../liked-posts.service';
import { GetLikedPostInput } from '../dto/get-liked-post.dto';

@Resolver(() => LikedPostModel)
export class LikedPostsMutationsResolver {
  constructor(private readonly likedPostsService: LikedPostsService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => LikedPostModel)
  addPostToLikes(
    @Args('addPostToLikesInput') createLikedPostInput: CreateLikedPostInput,
    @CurrentUser() user,
  ) {
    return this.likedPostsService.create(createLikedPostInput, user.id);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditLikedPostsGuard)
  @Mutation(() => LikedPostModel)
  removePostFromLikes(
    @Args('getLikedPostInput')
    getLikedPostInput: GetLikedPostInput,
  ) {
    return this.likedPostsService.remove(getLikedPostInput);
  }
}
