import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PostsRepository } from 'src/posts/posts.repository';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { PostModel } from '../dto/post.model';

@Injectable()
export class PostDataLoader implements NestDataLoader<string, PostModel[]> {
  constructor(private readonly postsRepository: PostsRepository) {}

  generateDataLoader(): DataLoader<string, PostModel[], string> {
    return new DataLoader(async (userIds) => {
      const posts = await this.postsRepository.getByUserIds(
        userIds as string[],
      );

      return userIds.map((id) => posts.filter((post) => post.userId === id));
    });
  }
}
