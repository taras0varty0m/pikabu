import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CommentsRepository } from 'src/comments/comments.repository';
import { Comment } from 'src/comments/entities/comment.entity';
import { LikedPost } from 'src/liked-posts/entities/liked-post.entity';
import { LikedPostsRepository } from 'src/liked-posts/liked-posts.repository';

@Injectable({ scope: Scope.REQUEST })
export class PostLoaders {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly likedPostsRepository: LikedPostsRepository,
  ) {}

  readonly batchComments = new DataLoader(async (ids: string[]) => {
    const comments = await this.commentRepository.getByPostIds(ids);

    const postIdToComments: { [key: string]: Comment[] } = {};

    comments.forEach((comment) => {
      if (!postIdToComments[comment.postId]) {
        postIdToComments[comment.postId] = [comment];
      } else {
        postIdToComments[comment.postId].push(comment);
      }
    });

    return ids.map((id) => postIdToComments[id] || []);
  });

  readonly batchPostLikes = new DataLoader(async (ids: string[]) => {
    const likedPosts = await this.likedPostsRepository.getByPostIds(ids);

    const postIdToLikedPost: { [key: string]: LikedPost[] } = {};

    likedPosts.forEach((likedPost) => {
      if (!postIdToLikedPost[likedPost.postId]) {
        postIdToLikedPost[likedPost.postId] = [likedPost];
      } else {
        postIdToLikedPost[likedPost.postId].push(likedPost);
      }
    });

    return ids.map((id) => postIdToLikedPost[id] || []);
  });
}
