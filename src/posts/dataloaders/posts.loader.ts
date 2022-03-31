import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { PostModel } from '../dto/post.model';
import { PostsRepository } from '../posts.repository';

@Injectable()
export class PostsDataLoader implements NestDataLoader<string, PostModel> {
  constructor(private readonly postsRepository: PostsRepository) {}

  generateDataLoader(): DataLoader<string, PostModel, string> {
    return new DataLoader(async (postIds) => {
      const posts = await this.postsRepository.findByIds(postIds as string[]);

      return postIds.map((id) => posts.find((post) => post.id === id));
    });
  }
}
