import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { AddCommentToFavoritesInput } from '../dto/create-favorited-comment.input';
import { FavoritedCommentModel } from '../dto/favorited-comment.model';
import { GetFavoritedCommentInput } from '../dto/get-favorited-comment.dto';
import { EditFavoritedCommentsGuard } from '../edit-favorited-comments.guard';
import { FavoritedCommentsService } from '../favorited-comments.service';

@Resolver(() => FavoritedCommentModel)
export class FavoritedCommentsMutationsResolver {
  constructor(
    private readonly favoritedCommentsService: FavoritedCommentsService,
  ) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => FavoritedCommentModel)
  addCommentToFavorites(
    @Args('addCommentToFavoritesInput')
    addCommentToFavoritesInput: AddCommentToFavoritesInput,
    @CurrentUser() user,
  ) {
    return this.favoritedCommentsService.create(
      addCommentToFavoritesInput,
      user.id,
    );
  }

  @UseGuards(GraphqlJwtAuthGuard, EditFavoritedCommentsGuard)
  @Mutation(() => FavoritedCommentModel)
  removeCommentFromFavorites(
    @Args('getFavoritedCommentInput')
    getFavoritedCommentInput: GetFavoritedCommentInput,
  ) {
    return this.favoritedCommentsService.remove(getFavoritedCommentInput);
  }
}
