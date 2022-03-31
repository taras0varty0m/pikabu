import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { TypeLike } from 'src/common/type-like.enum';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { PostsRepository } from '../posts.repository';

@Injectable()
export class PostsDisLikesDataLoader
  implements NestDataLoader<string, number[]>
{
  constructor(private readonly postsRepository: PostsRepository) {}

  generateDataLoader(): DataLoader<string, number[], string> {
    return new DataLoader(async (postIds) => {
      const posts: any = await this.postsRepository.getVoteCount(
        postIds as string[],
        TypeLike.DISLIKE,
      );

      return postIds.map(
        (id) => posts.find((post) => post.id === id)?.disLikedPostCount || 0,
      );
    });
  }
}
