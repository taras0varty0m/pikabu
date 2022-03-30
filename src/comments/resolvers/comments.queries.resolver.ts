import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommentsService } from '../comments.service';
import { CommentModel } from '../dto/comment.model';
import { GetCommentInput } from '../dto/get-comment.dto';
import { GetCommentsInput } from '../dto/get-comments.dto';
import { PaginatedComments } from '../dto/paginate-comment.dto';

@Resolver(() => CommentModel)
export class CommentsQueriesResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => PaginatedComments, { name: 'comments' })
  findAllByUserId(
    @Args('getCommentsWithPaginateAndFilterByUserIdInput')
    getCommentInput: GetCommentsInput,
  ) {
    return this.commentsService.findWithPaginate(getCommentInput);
  }

  @Query(() => CommentModel, { name: 'comment' })
  findOne(
    @Args('getCommentInput')
    getCommentInput: GetCommentInput,
  ) {
    return this.commentsService.findOne(getCommentInput);
  }
}
