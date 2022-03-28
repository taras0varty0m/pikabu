import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { CreateLikedPostInput } from '../dto/create-liked-post.input';
import { LikedPostModel } from '../dto/liked-post.model';
import { EditLikedPostsGuard } from '../edit-liked-posts.guard';
import { LikedPostsService } from '../liked-posts.service';

@Resolver(() => LikedPostModel)
export class LikedPostsMutationsResolver {
  constructor(private readonly likedPostsService: LikedPostsService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => LikedPostModel)
  createLikedPost(
    @Args('createLikedPostInput') createLikedPostInput: CreateLikedPostInput,
    @CurrentUser() user,
  ) {
    return this.likedPostsService.create(createLikedPostInput, user.id);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditLikedPostsGuard)
  @Mutation(() => LikedPostModel)
  removeLikedPost(@Args('id', { type: () => ID }) id: string) {
    return this.likedPostsService.remove(id);
  }
}
