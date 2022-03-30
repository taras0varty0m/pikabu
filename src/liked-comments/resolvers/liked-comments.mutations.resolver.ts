import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { CreateLikedCommentInput } from '../dto/create-liked-comment.input';
import { LikedCommentModel } from '../dto/liked-comment.model';
import { EditLikedCommentsGuard } from '../edit-liked-comments.guard';
import { LikedCommentsService } from '../liked-comments.service';

@Resolver(() => LikedCommentModel)
export class LikedCommentsMutationsResolver {
  constructor(private readonly likedCommentsService: LikedCommentsService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => LikedCommentModel)
  createLikedComment(
    @Args('createLikedCommentInput')
    createLikedCommentInput: CreateLikedCommentInput,
    @CurrentUser() user,
  ) {
    return this.likedCommentsService.create(createLikedCommentInput, user.id);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditLikedCommentsGuard)
  @Mutation(() => LikedCommentModel)
  removeLikedComment(@Args('id', { type: () => ID }) id: string) {
    return this.likedCommentsService.remove(id);
  }
}
