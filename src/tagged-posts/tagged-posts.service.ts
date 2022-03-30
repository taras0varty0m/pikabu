import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaggedPostInput } from './dto/create-tagged-post.input';
import { GetTaggedPostInput } from './dto/get-tagged-post.dto';
import { TaggedPost } from './entities/tagged-post.entity';
import { TaggedPostsRepository } from './tagged-posts.repository';

@Injectable()
export class TaggedPostsService {
  constructor(private taggedPostsRepository: TaggedPostsRepository) {}
  async create(createTaggedPostInput: CreateTaggedPostInput, userId: string) {
    const taggedPost = TaggedPost.create({ ...createTaggedPostInput, userId });

    return await taggedPost.save();
  }

  findAll() {
    return this.taggedPostsRepository.find();
  }

  async findOne(getTaggedPostInput: GetTaggedPostInput) {
    const taggedPost = await this.taggedPostsRepository.findOne(
      getTaggedPostInput.id,
    );

    if (!taggedPost)
      throw new NotFoundException(
        `TaggedPost ${getTaggedPostInput.id} not found`,
      );

    return taggedPost;
  }

  async remove(getTaggedPostInput: GetTaggedPostInput) {
    const taggedPost = await this.taggedPostsRepository.findOne(
      getTaggedPostInput.id,
    );

    if (!taggedPost)
      throw new NotFoundException(
        `TaggedPost ${getTaggedPostInput.id} not found`,
      );

    return await this.taggedPostsRepository.remove(taggedPost);
  }
}
