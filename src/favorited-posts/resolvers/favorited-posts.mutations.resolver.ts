import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { CreateFavoritedPostInput } from '../dto/create-favorited-post.input';
import { FavoritedPostModel } from '../dto/favorited-post.model';
import { GetFavoritedPostInput } from '../dto/get-favorited-post.dto';
import { EditFavoritedPostsGuard } from '../edit-favorited-posts.guard';
import { FavoritedPostsService } from '../favorited-posts.service';

@Resolver(() => FavoritedPostModel)
export class FavoritedPostsMutationsResolver {
  constructor(private readonly favoritedPostsService: FavoritedPostsService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => FavoritedPostModel)
  addPostToFavorites(
    @Args('createFavoritedPostInput')
    createFavoritedPostInput: CreateFavoritedPostInput,
    @CurrentUser() user,
  ) {
    return this.favoritedPostsService.create(createFavoritedPostInput, user.id);
  }
  @UseGuards(GraphqlJwtAuthGuard, EditFavoritedPostsGuard)
  @Mutation(() => FavoritedPostModel)
  removePostFromFavorites(
    @Args('getFavoritedPostInput')
    getFavoritedPostInput: GetFavoritedPostInput,
  ) {
    return this.favoritedPostsService.remove(getFavoritedPostInput);
  }
}
