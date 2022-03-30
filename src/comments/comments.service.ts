import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CommentsRepository } from './comments.repository';
import { CommentSort } from './dto/comment-sort.enum';
import { CreateCommentInput } from './dto/create-comment.input';
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

  async findWithPaginate(
    options: IPaginationOptions,
    userId: string,
    sortOptions?: CommentSort[],
  ) {
    return this.commentsRepository.getAllWithPaginationOptionsByUserId(
      options,
      userId,
      sortOptions,
    );
  }

  async findOne(id: string) {
    const comment = await this.commentsRepository.findOne(id);

    if (!comment) throw new NotFoundException(`Comment ${id} not found`);

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

  async remove(id: string) {
    const comment = await this.commentsRepository.findOne(id);

    if (!comment) throw new NotFoundException(`Comment not found`);

    return await this.commentsRepository.remove(comment);
  }

  findAllByPostId(postId: string, options: IPaginationOptions) {
    return paginate<Comment>(this.commentsRepository, options, {
      postId,
    });
  }
}
