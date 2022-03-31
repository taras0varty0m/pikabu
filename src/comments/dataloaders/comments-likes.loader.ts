import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { TypeLike } from 'src/common/type-like.enum';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { CommentsRepository } from '../comments.repository';

@Injectable()
export class CommentsLikesDataLoader
  implements NestDataLoader<string, number[]>
{
  constructor(private readonly commentsRepository: CommentsRepository) {}

  generateDataLoader(): DataLoader<string, number[], string> {
    return new DataLoader(async (commentIds) => {
      const comments: any = await this.commentsRepository.getVoteCount(
        commentIds as string[],
        TypeLike.LIKE,
      );

      return commentIds.map(
        (id) =>
          comments.find((comment) => comment.id === id)?.likedCommentCount || 0,
      );
    });
  }
}
