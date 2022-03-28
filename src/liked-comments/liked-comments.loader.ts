import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { LikedCommentsRepository } from 'src/liked-comments/liked-comments.repository';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { LikedCommentModel } from './dto/liked-comment.model';

@Injectable()
export class LikedCommentDataLoader
  implements NestDataLoader<string, LikedCommentModel[]>
{
  constructor(
    private readonly likedCommentsRepository: LikedCommentsRepository,
  ) {}

  generateDataLoader(): DataLoader<string, LikedCommentModel[], string> {
    return new DataLoader(async (commentIds) => {
      const likedComments = await this.likedCommentsRepository.getByCommentIds(
        commentIds as string[],
      );

      return commentIds.map((id) =>
        likedComments.filter((comment) => comment.commentId === id),
      );
    });
  }
}
