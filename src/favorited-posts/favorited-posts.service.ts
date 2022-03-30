import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CreateFavoritedPostInput } from './dto/create-favorited-post.input';
import { FavoritedPost } from './entities/favorited-post.entity';
import { FavoritedPostsRepository } from './favorited-posts.repository';

@Injectable()
export class FavoritedPostsService {
  constructor(private favoritedPostsRepository: FavoritedPostsRepository) {}
  async create(
    createFavoritedPostInput: CreateFavoritedPostInput,
    userId: string,
  ) {
    const favoritedPost = FavoritedPost.create({
      ...createFavoritedPostInput,
      userId,
    });

    return await favoritedPost.save();
  }

  async findWithPaginate(options: IPaginationOptions, userId: string) {
    return paginate<FavoritedPost>(this.favoritedPostsRepository, options, {
      order: {
        id: 'DESC',
      },
      userId,
    });
  }

  async findOne(id: string) {
    const favoritedPost = await this.favoritedPostsRepository.findOne(id);

    if (!favoritedPost)
      throw new NotFoundException(`FavoritedPost ${id} not found`);

    return favoritedPost;
  }

  async remove(id: string) {
    const favoritedPost = await this.favoritedPostsRepository.findOne(id);

    if (!favoritedPost) throw new NotFoundException(`FavoritedPost not found`);

    return await this.favoritedPostsRepository.remove(favoritedPost);
  }

  findPostsByUserId(userId: string) {
    return this.favoritedPostsRepository.find({ userId });
  }
}
