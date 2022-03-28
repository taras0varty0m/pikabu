import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaggedPostInput } from './dto/create-tagged-post.input';
import { TaggedPost } from './entities/tagged-post.entity';
import { TaggedPostsRepository } from './tagged-posts.repository';

@Injectable()
export class TaggedPostsService {
  constructor(private taggedPostsRepository: TaggedPostsRepository) {}
  async create(createTaggedPostInput: CreateTaggedPostInput, userId: number) {
    const taggedPost = TaggedPost.create({ ...createTaggedPostInput, userId });
    return await taggedPost.save();
  }

  findAll() {
    return this.taggedPostsRepository.find();
  }

  async findOne(id: number) {
    const taggedPost = await this.taggedPostsRepository.findOne(id);
    if (!taggedPost) throw new NotFoundException(`TaggedPost ${id} not found`);
    return taggedPost;
  }

  async remove(id: number) {
    const taggedPost = await this.taggedPostsRepository.findOne(id);
    if (!taggedPost) throw new NotFoundException(`TaggedPost not found`);
    return await this.taggedPostsRepository.remove(taggedPost);
  }
}
