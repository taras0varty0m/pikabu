import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { FavoritedPostsRepository } from 'src/favorited-posts/favorited-posts.repository';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { FavoritedPostModel } from '../../favorited-posts/dto/favorited-post.model';

@Injectable()
export class UsersFavoritedPostDataLoader
  implements NestDataLoader<string, FavoritedPostModel[]>
{
  constructor(
    private readonly favoritedPostsRepository: FavoritedPostsRepository,
  ) {}

  generateDataLoader(): DataLoader<string, FavoritedPostModel[], string> {
    return new DataLoader(async (userIds) => {
      const favoritedPosts = await this.favoritedPostsRepository.getByUserIds(
        userIds as string[],
      );

      return userIds.map((id) =>
        favoritedPosts.filter((post) => post.userId === id),
      );
    });
  }
}
