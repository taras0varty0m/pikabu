import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { LikedComment } from 'src/liked-comments/entities/liked-comment.entity';
import { LikedCommentsRepository } from 'src/liked-comments/liked-comments.repository';

@Injectable({ scope: Scope.REQUEST })
export class CommentLoaders {
  constructor(
    private readonly likedCommentsRepository: LikedCommentsRepository,
  ) {}

  readonly batchCommentLikes = new DataLoader(async (ids: number[]) => {
    const likedComments = await this.likedCommentsRepository.getByCommentIds(
      ids,
    );

    const commentIdToLikedComment: { [key: string]: LikedComment[] } = {};

    likedComments.forEach((likedComment) => {
      if (!commentIdToLikedComment[likedComment.commentId]) {
        commentIdToLikedComment[likedComment.commentId] = [likedComment];
      } else {
        commentIdToLikedComment[likedComment.commentId].push(likedComment);
      }
    });

    return ids.map((id) => commentIdToLikedComment[id] || []);
  });
}
