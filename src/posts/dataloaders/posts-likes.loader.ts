import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { PostsRepository } from '../posts.repository';

@Injectable()
export class PostsLikesDataLoader implements NestDataLoader<string, number[]> {
  constructor(private readonly postsRepository: PostsRepository) {}

  generateDataLoader(): DataLoader<string, number[], string> {
    return new DataLoader(async (postIds) => {
      const posts: any = await this.postsRepository.getLikesCount(
        postIds as string[],
      );

      return postIds.map(
        (id) => posts.find((post) => post.id === id)?.likedPostCount || 0,
      );
    });
  }
}
