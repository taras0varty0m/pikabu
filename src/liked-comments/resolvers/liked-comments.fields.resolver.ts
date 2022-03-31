import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { CommentsDataLoader } from 'src/comments/dataloaders/comments.loader';
import { CommentModel } from 'src/comments/dto/comment.model';
import { Loader } from 'src/libs/NestDataloader';
import { UsersDataLoader } from 'src/users/dataloaders/users.loader';
import { UserModel } from 'src/users/dto/user.model';
import { LikedCommentModel } from '../dto/liked-comment.model';

@Resolver(() => LikedCommentModel)
export class LikedCommentsFieldsResolver {
  @ResolveField(() => UserModel)
  async user(
    @Parent() { user, userId }: LikedCommentModel,
    @Loader(UsersDataLoader.name)
    usersDataLoader: ReturnType<UsersDataLoader['generateDataLoader']>,
  ) {
    if (user) return user;

    return await usersDataLoader.load(userId);
  }

  @ResolveField(() => CommentModel)
  async comment(
    @Parent() { comment, commentId }: LikedCommentModel,
    @Loader(CommentsDataLoader.name)
    commentsDataLoader: ReturnType<CommentsDataLoader['generateDataLoader']>,
  ) {
    if (comment) return comment;

    return await commentsDataLoader.load(commentId);
  }
}
