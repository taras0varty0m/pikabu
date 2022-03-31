import { Resolver, Parent, ResolveField, Int } from '@nestjs/graphql';
import { Loader } from 'src/libs/NestDataloader';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { CommentsLikedCommentDataLoader } from 'src/comments/dataloaders/comments-liked-comments.loader';
import { CommentModel } from '../dto/comment.model';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';
import { CommentsLikesDataLoader } from '../dataloaders/comments-likes.loader';
import { CommentsDisLikesDataLoader } from '../dataloaders/comments-dislikes.loader';
import { UsersDataLoader } from 'src/users/dataloaders/users.loader';
import { PostsDataLoader } from 'src/posts/dataloaders/posts.loader';

@Resolver(() => CommentModel)
export class CommentsFieldsResolver {
  @ResolveField(() => [LikedCommentModel])
  async likedComments(
    @Parent() { id, likedComments }: CommentModel,
    @Loader(CommentsLikedCommentDataLoader.name)
    likedCommentDataLoader: ReturnType<
      CommentsLikedCommentDataLoader['generateDataLoader']
    >,
  ) {
    if (likedComments) return likedComments;

    return await likedCommentDataLoader.load(id);
  }

  @ResolveField(() => Int)
  async likes(
    @Parent() { id, likes }: CommentModel,
    @Loader(CommentsLikesDataLoader.name)
    commentLikesDataLoader: ReturnType<
      CommentsLikesDataLoader['generateDataLoader']
    >,
  ) {
    if (likes) return likes;

    return await commentLikesDataLoader.load(id);
  }

  @ResolveField(() => Int)
  async disLikes(
    @Parent() { id, disLikes }: CommentModel,
    @Loader(CommentsDisLikesDataLoader.name)
    commentDisLikesDataLoader: ReturnType<
      CommentsDisLikesDataLoader['generateDataLoader']
    >,
  ) {
    if (disLikes) return disLikes;

    return await commentDisLikesDataLoader.load(id);
  }

  @ResolveField(() => PostModel)
  async post(
    @Parent() { post, postId }: CommentModel,
    @Loader(PostsDataLoader.name)
    postsDataLoader: ReturnType<PostsDataLoader['generateDataLoader']>,
  ) {
    if (post) return post;

    return await postsDataLoader.load(postId);
  }

  @ResolveField(() => UserModel)
  async user(
    @Parent() { user, userId }: CommentModel,
    @Loader(UsersDataLoader.name)
    usersDataLoader: ReturnType<UsersDataLoader['generateDataLoader']>,
  ) {
    if (user) return user;

    return await usersDataLoader.load(userId);
  }
}
