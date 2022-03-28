import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { PaginateInput } from 'src/common/paginate.input';
import { CommentsService } from '../comments.service';
import { CommentSort } from '../dto/comment-sort.enum';
import { CommentModel } from '../dto/comment.model';
import { PaginatedComments } from '../dto/paginate-comment.dto';

@Resolver(() => CommentModel)
export class CommentsQueriesResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => PaginatedComments, { name: 'comments' })
  findAllByUserId(
    @Args() options: PaginateInput,
    @Args('userId', { type: () => ID }) userId: string,
    @Args('commentSort', { type: () => [CommentSort], nullable: true })
    sortOptions: CommentSort[],
  ) {
    return this.commentsService.findWithPaginate(options, userId, sortOptions);
  }

  @Query(() => CommentModel, { name: 'comment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.commentsService.findOne(id);
  }
}
