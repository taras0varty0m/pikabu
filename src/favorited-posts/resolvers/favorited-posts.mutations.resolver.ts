import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { CreateFavoritedPostInput } from '../dto/create-favorited-post.input';
import { FavoritedPostModel } from '../dto/favorited-post.model';
import { EditFavoritedPostsGuard } from '../edit-favorited-posts.guard';
import { FavoritedPostsService } from '../favorited-posts.service';

@Resolver(() => FavoritedPostModel)
export class FavoritedPostsMutationsResolver {
  constructor(private readonly favoritedPostsService: FavoritedPostsService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => FavoritedPostModel)
  createFavoritedPost(
    @Args('createFavoritedPostInput')
    createFavoritedPostInput: CreateFavoritedPostInput,
    @CurrentUser() user,
  ) {
    return this.favoritedPostsService.create(createFavoritedPostInput, user.id);
  }
  @UseGuards(GraphqlJwtAuthGuard, EditFavoritedPostsGuard)
  @Mutation(() => FavoritedPostModel)
  removeFavoritedPost(@Args('id', { type: () => Int }) id: number) {
    return this.favoritedPostsService.remove(id);
  }
}
