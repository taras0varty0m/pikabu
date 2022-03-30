import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CreateFavoritedCommentInput } from './dto/create-favorited-comment.input';
import { FavoritedComment } from './entities/favorited-comment.entity';
import { FavoritedCommentsRepository } from './favorited-comments.repository';

@Injectable()
export class FavoritedCommentsService {
  constructor(
    private favoritedCommentsRepository: FavoritedCommentsRepository,
  ) {}
  async create(
    createFavoritedCommentInput: CreateFavoritedCommentInput,
    userId: string,
  ) {
    const favoritedComment = FavoritedComment.create({
      ...createFavoritedCommentInput,
      userId,
    });

    return await favoritedComment.save();
  }

  async findWithPaginate(options: IPaginationOptions, userId: string) {
    return paginate<FavoritedComment>(
      this.favoritedCommentsRepository,
      options,
      {
        order: {
          id: 'DESC',
        },
        userId,
      },
    );
  }

  async findOne(id: string) {
    const favoritedComment = await this.favoritedCommentsRepository.findOne(id);

    if (!favoritedComment)
      throw new NotFoundException(`FavoritedComment ${id} not found`);

    return favoritedComment;
  }

  async remove(id: string) {
    const favoritedComment = await this.favoritedCommentsRepository.findOne(id);

    if (!favoritedComment)
      throw new NotFoundException(`FavoritedComment not found`);

    return await this.favoritedCommentsRepository.remove(favoritedComment);
  }

  findPostsByUserId(userId: string) {
    return this.favoritedCommentsRepository.find({ userId });
  }
}
