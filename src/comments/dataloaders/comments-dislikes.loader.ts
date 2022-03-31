import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { TypeLike } from 'src/common/type-like.enum';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { CommentsRepository } from '../comments.repository';

@Injectable()
export class CommentsDisLikesDataLoader
  implements NestDataLoader<string, number[]>
{
  constructor(private readonly commentsRepository: CommentsRepository) {}

  generateDataLoader(): DataLoader<string, number[], string> {
    return new DataLoader(async (commentIds) => {
      const comments: any = await this.commentsRepository.getVoteCount(
        commentIds as string[],
        TypeLike.DISLIKE,
      );

      return commentIds.map(
        (id) =>
          comments.find((comment) => comment.id === id)?.disLikedCommentCount ||
          0,
      );
    });
  }
}
