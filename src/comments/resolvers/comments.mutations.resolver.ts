import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { CommentsService } from '../comments.service';
import { CommentModel } from '../dto/comment.model';
import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentInput } from '../dto/update-comment.input';
import { EditCommentsGuard } from '../edit-comments.guard';
import { GetCommentInput } from '../dto/get-comment.dto';

@Resolver(() => CommentModel)
export class CommentsMutationsResolver {
  constructor(private readonly commentsService: CommentsService) {}

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
  removeComment(
    @Args('getCommentInput')
    getCommentInput: GetCommentInput,
  ) {
    return this.commentsService.remove(getCommentInput);
  }
}
