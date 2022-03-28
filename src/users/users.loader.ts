import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { FavoritedComment } from 'src/favorited-comments/entities/favorited-comment.entity';
import { FavoritedCommentsRepository } from 'src/favorited-comments/favorited-comments.repository';
import { FavoritedPost } from 'src/favorited-posts/entities/favorited-post.entity';
import { FavoritedPostsRepository } from 'src/favorited-posts/favorited-posts.repository';
import { Post } from 'src/posts/entities/post.entity';
import { PostsRepository } from 'src/posts/posts.repository';

@Injectable({ scope: Scope.REQUEST })
export class UserLoaders {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly favoritedPostsRepository: FavoritedPostsRepository,
    private readonly favoritedCommentsRepository: FavoritedCommentsRepository,
  ) {}

  readonly batchPosts = new DataLoader(async (ids: number[]) => {
    const posts = await this.postsRepository.getByUserIds(ids);

    const userIdToPosts: { [key: string]: Post[] } = {};

    posts.forEach((post) => {
      if (!userIdToPosts[post.userId]) {
        userIdToPosts[post.userId] = [post];
      } else {
        userIdToPosts[post.userId].push(post);
      }
    });

    return ids.map((id) => userIdToPosts[id] || []);
  });

  readonly batchFavoritedPosts = new DataLoader(async (ids: number[]) => {
    const posts = await this.favoritedPostsRepository.getByUserIds(ids);

    const userIdToFavoritePosts: { [key: string]: FavoritedPost[] } = {};

    posts.forEach((post) => {
      if (!userIdToFavoritePosts[post.userId]) {
        userIdToFavoritePosts[post.userId] = [post];
      } else {
        userIdToFavoritePosts[post.userId].push(post);
      }
    });

    return ids.map((id) => userIdToFavoritePosts[id] || []);
  });

  readonly batchFavoritedComments = new DataLoader(async (ids: number[]) => {
    const comments = await this.favoritedCommentsRepository.getByUserIds(ids);

    const userIdToFavoriteComments: { [key: string]: FavoritedComment[] } = {};

    comments.forEach((comment) => {
      if (!userIdToFavoriteComments[comment.userId]) {
        userIdToFavoriteComments[comment.userId] = [comment];
      } else {
        userIdToFavoriteComments[comment.userId].push(comment);
      }
    });

    return ids.map((id) => userIdToFavoriteComments[id] || []);
  });
}
