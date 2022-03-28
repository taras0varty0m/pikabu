import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { CommentLoaders } from '../comments.loader';
import { CommentsService } from '../comments.service';
import { CommentModel } from '../dto/comment.model';
import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentInput } from '../dto/update-comment.input';
import { EditCommentsGuard } from '../edit-comments.guard';

@Resolver(() => CommentModel)
export class CommentsMutationsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentLoaders: CommentLoaders,
  ) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => CommentModel)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user,
  ) {
    return this.commentsService.create(createCommentInput, user.id);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditCommentsGuard)
  @Mutation(() => CommentModel)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @UseGuards(GraphqlJwtAuthGuard, EditCommentsGuard)
  @Mutation(() => CommentModel)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.remove(id);
  }
}