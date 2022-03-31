import { Resolver, Parent, ResolveField, Int } from '@nestjs/graphql';
import { PostModel } from '../dto/post.model';
import { LikedPostModel } from 'src/liked-posts/dto/liked-post.model';
import { PostsLikedPostDataLoader } from 'src/posts/dataloaders/posts-liked-posts.loader';
import { Loader } from 'src/libs/NestDataloader';
import { CommentModel } from 'src/comments/dto/comment.model';
import { PostsCommentDataLoader } from 'src/posts/dataloaders/posts-comments.loader';
import { UserModel } from 'src/users/dto/user.model';
import { PostsDisLikesDataLoader } from '../dataloaders/posts-dislikes.loader';
import { PostsLikesDataLoader } from '../dataloaders/posts-likes.loader';
import { UsersDataLoader } from 'src/users/dataloaders/users.loader';

@Resolver(() => PostModel)
export class PostsFieldsResolver {
  @ResolveField(() => UserModel)
  async user(
    @Parent() { user, userId }: PostModel,
    @Loader(UsersDataLoader.name)
    usersDataLoader: ReturnType<UsersDataLoader['generateDataLoader']>,
  ) {
    if (user) return user;

    return await usersDataLoader.load(userId);
  }

  @ResolveField(() => [LikedPostModel])
  async likedPosts(
    @Parent() { id, likedPosts }: PostModel,
    @Loader(PostsLikedPostDataLoader.name)
    likedPostDataLoader: ReturnType<
      PostsLikedPostDataLoader['generateDataLoader']
    >,
  ) {
    if (likedPosts) return likedPosts;

    return await likedPostDataLoader.load(id);
  }

  @ResolveField(() => [CommentModel])
  async comments(
    @Parent() { id, comments }: PostModel,
    @Loader(PostsCommentDataLoader.name)
    postsCommentDataLoader: ReturnType<
      PostsCommentDataLoader['generateDataLoader']
    >,
  ) {
    if (comments) return comments;

    return await postsCommentDataLoader.load(id);
  }

  @ResolveField(() => Int)
  async likes(
    @Parent() { id, likes }: PostModel,
    @Loader(PostsLikesDataLoader.name)
    postLikesDataLoader: ReturnType<PostsLikesDataLoader['generateDataLoader']>,
  ) {
    if (likes) return likes;

    return await postLikesDataLoader.load(id);
  }

  @ResolveField(() => Int)
  async disLikes(
    @Parent() { id, disLikes }: PostModel,
    @Loader(PostsDisLikesDataLoader.name)
    postDisLikesDataLoader: ReturnType<
      PostsDisLikesDataLoader['generateDataLoader']
    >,
  ) {
    if (disLikes) return disLikes;

    return await postDisLikesDataLoader.load(id);
  }
}
