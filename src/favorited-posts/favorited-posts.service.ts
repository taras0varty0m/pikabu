import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { GetWithPaginateByUserIdInput } from 'src/common/get-with-paginate-by-user-id.dto';
import { CreateFavoritedPostInput } from './dto/create-favorited-post.input';
import { GetFavoritedPostInput } from './dto/get-favorited-post.dto';
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

  async findWithPaginate(
    getWithPaginateByUserIdInput: GetWithPaginateByUserIdInput,
  ) {
    return paginate<FavoritedPost>(
      this.favoritedPostsRepository,
      getWithPaginateByUserIdInput.paginateOptions,
      {
        order: {
          id: 'DESC',
        },
        userId: getWithPaginateByUserIdInput.userId,
      },
    );
  }

  async findOne(getFavoritedPostInput: GetFavoritedPostInput) {
    const favoritedPost = await this.favoritedPostsRepository.findOne(
      getFavoritedPostInput.id,
    );

    if (!favoritedPost)
      throw new NotFoundException(
        `FavoritedPost ${getFavoritedPostInput.id} not found`,
      );

    return favoritedPost;
  }

  async remove(getFavoritedPostInput: GetFavoritedPostInput) {
    const favoritedPost = await this.favoritedPostsRepository.findOne(
      getFavoritedPostInput.id,
    );

    if (!favoritedPost)
      throw new NotFoundException(
        `FavoritedPost ${getFavoritedPostInput.id} not found`,
      );

    return await this.favoritedPostsRepository.remove(favoritedPost);
  }

  findPostsByUserId(userId: string) {
    return this.favoritedPostsRepository.find({ userId });
  }
}
