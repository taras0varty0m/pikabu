import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { CreateFavoritedCommentInput } from '../dto/create-favorited-comment.input';
import { FavoritedCommentModel } from '../dto/favorited-comment.model';
import { EditFavoritedCommentsGuard } from '../edit-favorited-comments.guard';
import { FavoritedCommentsService } from '../favorited-comments.service';

@Resolver(() => FavoritedCommentModel)
export class FavoritedCommentsMutationsResolver {
  constructor(
    private readonly favoritedCommentsService: FavoritedCommentsService,
  ) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => FavoritedCommentModel)
  createFavoritedComment(
    @Args('createFavoritedCommentInput')
    createFavoritedCommentInput: CreateFavoritedCommentInput,
    @CurrentUser() user,
  ) {
    return this.favoritedCommentsService.create(
      createFavoritedCommentInput,
      user.id,
    );
  }

  @UseGuards(GraphqlJwtAuthGuard, EditFavoritedCommentsGuard)
  @Mutation(() => FavoritedCommentModel)
  removeFavoritedComment(@Args('id', { type: () => ID }) id: string) {
    return this.favoritedCommentsService.remove(id);
  }
}
