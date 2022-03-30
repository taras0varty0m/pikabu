import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { CommentsRepository } from 'src/comments/comments.repository';
import { CommentModel } from 'src/comments/dto/comment.model';
import { UserModel } from 'src/users/dto/user.model';
import { UsersRepository } from 'src/users/users.repository';
import { FavoritedCommentModel } from '../dto/favorited-comment.model';

@Resolver(() => FavoritedCommentModel)
export class FavoritedCommentsFieldsResolver {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @ResolveField(() => UserModel)
  user(@Parent() favoritedComment: FavoritedCommentModel) {
    return this.usersRepository.findOne(favoritedComment.userId);
  }

  @ResolveField(() => CommentModel)
  comment(@Parent() favoritedComment: FavoritedCommentModel) {
    return this.commentsRepository.findOne(favoritedComment.commentId);
  }
}
