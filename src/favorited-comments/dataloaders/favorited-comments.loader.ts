import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { FavoritedCommentsRepository } from 'src/favorited-comments/favorited-comments.repository';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { FavoritedCommentModel } from '../dto/favorited-comment.model';

@Injectable()
export class FavoritedCommentDataLoader
  implements NestDataLoader<string, FavoritedCommentModel[]>
{
  constructor(
    private readonly favoritedCommentsRepository: FavoritedCommentsRepository,
  ) {}

  generateDataLoader(): DataLoader<string, FavoritedCommentModel[], string> {
    return new DataLoader(async (userIds) => {
      const favoritedComments =
        await this.favoritedCommentsRepository.getByUserIds(
          userIds as string[],
        );

      return userIds.map((id) =>
        favoritedComments.filter((comment) => comment.userId === id),
      );
    });
  }
}
