import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { AddCommentToFavoritesInput } from './dto/create-favorited-comment.input';
import { GetFavoritedCommentInput } from './dto/get-favorited-comment.dto';
import { GetWithPaginateByUserIdInput } from '../common/get-with-paginate-by-user-id.dto';
import { FavoritedComment } from './entities/favorited-comment.entity';
import { FavoritedCommentsRepository } from './favorited-comments.repository';

@Injectable()
export class FavoritedCommentsService {
  constructor(
    private favoritedCommentsRepository: FavoritedCommentsRepository,
  ) {}
  async create(
    createFavoritedCommentInput: AddCommentToFavoritesInput,
    userId: string,
  ) {
    const favoritedComment = FavoritedComment.create({
      ...createFavoritedCommentInput,
      userId,
    });

    return await favoritedComment.save();
  }

  async findWithPaginate(
    getWithPaginateByUserIdInput: GetWithPaginateByUserIdInput,
  ) {
    return paginate<FavoritedComment>(
      this.favoritedCommentsRepository,
      getWithPaginateByUserIdInput.paginateOptions,
      {
        order: {
          id: 'DESC',
        },
        userId: getWithPaginateByUserIdInput.userId,
      },
    );
  }

  async findOne(getFavoritedCommentInput: GetFavoritedCommentInput) {
    const favoritedComment = await this.favoritedCommentsRepository.findOne({
      ...getFavoritedCommentInput,
    });

    if (!favoritedComment)
      throw new NotFoundException(
        `FavoritedComment ${getFavoritedCommentInput.id} not found`,
      );

    return favoritedComment;
  }

  async remove(getFavoritedCommentInput: GetFavoritedCommentInput) {
    const favoritedComment = await this.favoritedCommentsRepository.findOne({
      ...getFavoritedCommentInput,
    });

    if (!favoritedComment)
      throw new NotFoundException(
        `FavoritedComment ${getFavoritedCommentInput.id} not found`,
      );

    return await this.favoritedCommentsRepository.remove(favoritedComment);
  }

  findPostsByUserId(userId: string) {
    return this.favoritedCommentsRepository.find({ userId });
  }
}
