import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentInput } from './dto/create-comment.input';
import { GetCommentInput } from './dto/get-comment.dto';
import { GetCommentsInput } from './dto/get-comments.dto';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async create(createCommentInput: CreateCommentInput, userId: string) {
    const comment = Comment.create({ ...createCommentInput, userId });

    return await comment.save();
  }

  findAll() {
    return this.commentsRepository.find();
  }

  async findWithPaginate(getCommentsInput: GetCommentsInput) {
    return this.commentsRepository.getAllWithPaginationOptionsByUserId(
      getCommentsInput,
    );
  }

  async findOne(getCommentInput: GetCommentInput) {
    const comment = await this.commentsRepository.findOne(getCommentInput.id);

    if (!comment)
      throw new NotFoundException(`Comment ${getCommentInput.id} not found`);

    return comment;
  }

  async update(id: string, updateCommentInput: UpdateCommentInput) {
    const comment = await this.commentsRepository.preload({
      id,
      ...updateCommentInput,
    });

    if (!comment) throw new NotFoundException(`Comment not found`);

    return await comment.save();
  }

  async remove(getCommentInput: GetCommentInput) {
    const comment = await this.commentsRepository.findOne(getCommentInput.id);

    if (!comment)
      throw new NotFoundException(`Comment ${getCommentInput.id} not found`);

    return await this.commentsRepository.remove(comment);
  }
}
