import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreatePostInput } from './dto/create-post.input';
import { PostFilter } from './dto/post-filter.input';
import { PostSort } from './dto/post-sort.enum';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async create(createPostInput: CreatePostInput, userId: string) {
    const post = Post.create({ ...createPostInput, userId });

    return await post.save();
  }

  findAll() {
    return this.postsRepository.find();
  }

  findByTitle(title: string) {
    return this.postsRepository.find({ where: { title: title } });
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOne(id);

    if (!post) throw new NotFoundException(`Post ${id} not found`);

    return post;
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const post = await this.postsRepository.preload({
      id,
      ...updatePostInput,
    });

    if (!post) throw new NotFoundException(`Post not found`);

    return await post.save();
  }

  async remove(id: string) {
    const post = await this.postsRepository.findOne(id);

    if (!post) throw new NotFoundException(`Post not found`);

    return await this.postsRepository.remove(post);
  }

  async findWithPaginate(
    options: IPaginationOptions,
    sortOptions?: PostSort[],
    postFiler?: PostFilter,
    search?: string,
  ) {
    return this.postsRepository.getAllWithPaginationOptions(
      options,
      sortOptions,
      postFiler,
      search,
    );
  }

  findPostsByUserId(userId: string) {
    return this.postsRepository.find({ userId });
  }
}
