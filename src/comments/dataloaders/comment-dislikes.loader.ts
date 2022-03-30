import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { LikedCommentModel } from 'src/liked-comments/dto/liked-comment.model';
import { LikedCommentsRepository } from 'src/liked-comments/liked-comments.repository';

@Injectable()
export class CommentDisLikesDataLoader
  implements NestDataLoader<string, LikedCommentModel[]>
{
  constructor(
    private readonly likedCommentsRepository: LikedCommentsRepository,
  ) {}

  generateDataLoader(): DataLoader<string, LikedCommentModel[], string> {
    return new DataLoader(async (commentIds) => {
      const comments =
        await this.likedCommentsRepository.getDisLikesByCommentIds(
          commentIds as string[],
        );

      return commentIds.map((id) =>
        comments.filter((like) => like.commentId === id),
      );
    });
  }
}
