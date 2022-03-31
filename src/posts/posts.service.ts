import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { GetPostInput } from './dto/get-post.dto';
import { GetPostsInput } from './dto/get-posts.dto';
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

  async findOne(getPostInput: GetPostInput) {
    const post = await this.postsRepository.findOne(getPostInput.id);

    if (!post) throw new NotFoundException(`Post ${getPostInput.id} not found`);

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

  async remove(getPostInput: GetPostInput) {
    const post = await this.postsRepository.findOne(getPostInput.id);

    if (!post) throw new NotFoundException(`Post ${getPostInput.id} not found`);

    return await this.postsRepository.remove(post);
  }

  async findWithPaginate(getPostsInput: GetPostsInput) {
    return this.postsRepository.getAllWithPaginationOptions(getPostsInput);
  }

  findPostsByUserId(userId: string) {
    return this.postsRepository.find({ userId });
  }
}
