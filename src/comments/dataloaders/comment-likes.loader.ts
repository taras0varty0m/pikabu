import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { CommentsRepository } from '../comments.repository';

@Injectable()
export class CommentLikesDataLoader
  implements NestDataLoader<string, number[]>
{
  constructor(private readonly commentsRepository: CommentsRepository) {}

  generateDataLoader(): DataLoader<string, number[], string> {
    return new DataLoader(async (commentIds) => {
      const comments: any = await this.commentsRepository.getLikesCount(
        commentIds as string[],
      );

      const ids = commentIds.map(
        (id) =>
          comments.find((comment) => comment.id === id)?.likedCommentCount || 0,
      );

      return ids;
    });
  }
}
