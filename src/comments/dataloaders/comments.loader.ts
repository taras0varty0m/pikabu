import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { CommentModel } from '../dto/comment.model';
import { CommentsRepository } from '../comments.repository';

@Injectable()
export class CommentsDataLoader
  implements NestDataLoader<string, CommentModel>
{
  constructor(private readonly commentsRepository: CommentsRepository) {}

  generateDataLoader(): DataLoader<string, CommentModel, string> {
    return new DataLoader(async (commentIds) => {
      const comments = await this.commentsRepository.findByIds(
        commentIds as string[],
      );

      return commentIds.map((id) =>
        comments.find((comment) => comment.id === id),
      );
    });
  }
}
