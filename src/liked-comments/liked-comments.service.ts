import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikedCommentInput } from './dto/create-liked-comment.input';
import { LikedComment } from './entities/liked-comment.entity';
import { LikedCommentsRepository } from './liked-comments.repository';

@Injectable()
export class LikedCommentsService {
  constructor(private likedCommentsRepository: LikedCommentsRepository) {}
  async create(
    createLikedCommentInput: CreateLikedCommentInput,
    userId: string,
  ) {
    const likedComment = LikedComment.create({
      ...createLikedCommentInput,
      userId,
    });
    return await likedComment.save();
  }

  findAll() {
    return this.likedCommentsRepository.find();
  }

  async findOne(id: string) {
    const likedComment = await this.likedCommentsRepository.findOne(id);
    if (!likedComment)
      throw new NotFoundException(`LikedComment ${id} not found`);
    return likedComment;
  }

  async remove(id: string) {
    const likedComment = await this.likedCommentsRepository.findOne(id);
    if (!likedComment) throw new NotFoundException(`LikedComment not found`);
    return await this.likedCommentsRepository.remove(likedComment);
  }
}
