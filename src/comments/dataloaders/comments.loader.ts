import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CommentsRepository } from 'src/comments/comments.repository';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { CommentModel } from '../dto/comment.model';

@Injectable()
export class CommentDataLoader
  implements NestDataLoader<string, CommentModel[]>
{
  constructor(private readonly commentsRepository: CommentsRepository) {}

  generateDataLoader(): DataLoader<string, CommentModel[], string> {
    return new DataLoader(async (postIds) => {
      const comments = await this.commentsRepository.getByPostIds(
        postIds as string[],
      );

      return postIds.map((id) => comments.filter((post) => post.postId === id));
    });
  }
}
