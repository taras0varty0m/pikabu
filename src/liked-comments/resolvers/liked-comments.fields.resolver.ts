import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { CommentsRepository } from 'src/comments/comments.repository';
import { CommentModel } from 'src/comments/dto/comment.model';
import { UserModel } from 'src/users/dto/user.model';
import { UsersRepository } from 'src/users/users.repository';
import { LikedCommentModel } from '../dto/liked-comment.model';

@Resolver(() => LikedCommentModel)
export class LikedCommentsFieldsResolver {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @ResolveField(() => UserModel)
  user(@Parent() likedComment: LikedCommentModel) {
    return this.usersRepository.findOne(likedComment.userId);
  }

  @ResolveField(() => CommentModel)
  comment(@Parent() likedComment: LikedCommentModel) {
    return this.commentsRepository.findOne(likedComment.commentId);
  }
}
