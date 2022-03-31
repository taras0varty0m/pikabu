import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { LikedPostsRepository } from 'src/liked-posts/liked-posts.repository';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { LikedPostModel } from '../../liked-posts/dto/liked-post.model';

@Injectable()
export class PostsLikedPostDataLoader
  implements NestDataLoader<string, LikedPostModel[]>
{
  constructor(private readonly likedPostsRepository: LikedPostsRepository) {}

  generateDataLoader(): DataLoader<string, LikedPostModel[], string> {
    return new DataLoader(async (postIds) => {
      const likedPosts = await this.likedPostsRepository.getByPostIds(
        postIds as string[],
      );

      return postIds.map((id) =>
        likedPosts.filter((post) => post.postId === id),
      );
    });
  }
}
