import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikedPostInput } from './dto/create-liked-post.input';
import { GetLikedPostInput } from './dto/get-liked-post.dto';
import { LikedPost } from './entities/liked-post.entity';
import { LikedPostsRepository } from './liked-posts.repository';

@Injectable()
export class LikedPostsService {
  constructor(private likedPostsRepository: LikedPostsRepository) {}
  async create(createLikedPostInput: CreateLikedPostInput, userId: string) {
    const likedPost = LikedPost.create({ ...createLikedPostInput, userId });

    return await likedPost.save();
  }

  findAllByPostId(postId: string) {
    return this.likedPostsRepository.find({ postId });
  }

  findAll() {
    return this.likedPostsRepository.find();
  }

  async findOne(getLikedPostInput: GetLikedPostInput) {
    const likedPost = await this.likedPostsRepository.findOne(
      getLikedPostInput.id,
    );

    if (!likedPost)
      throw new NotFoundException(
        `LikedPost ${getLikedPostInput.id} not found`,
      );

    return likedPost;
  }

  async remove(getLikedPostInput: GetLikedPostInput) {
    const likedPost = await this.likedPostsRepository.findOne(
      getLikedPostInput.id,
    );

    if (!likedPost)
      throw new NotFoundException(
        `LikedPost ${getLikedPostInput.id} not found`,
      );

    return await this.likedPostsRepository.remove(likedPost);
  }
}
