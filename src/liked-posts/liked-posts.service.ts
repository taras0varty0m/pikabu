import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikedPostInput } from './dto/create-liked-post.input';
import { LikedPost } from './entities/liked-post.entity';
import { LikedPostsRepository } from './liked-posts.repository';

@Injectable()
export class LikedPostsService {
  constructor(private likedPostsRepository: LikedPostsRepository) {}
  async create(createLikedPostInput: CreateLikedPostInput, userId: number) {
    const likedPost = LikedPost.create({ ...createLikedPostInput, userId });
    return await likedPost.save();
  }

  findAllByPostId(postId: number) {
    return this.likedPostsRepository.find({ postId });
  }

  findAll() {
    return this.likedPostsRepository.find();
  }

  async findOne(id: number) {
    const likedPost = await this.likedPostsRepository.findOne(id);
    if (!likedPost) throw new NotFoundException(`LikedPost ${id} not found`);
    return likedPost;
  }

  async remove(id: number) {
    const likedPost = await this.likedPostsRepository.findOne(id);
    if (!likedPost) throw new NotFoundException(`LikedPost not found`);
    return await this.likedPostsRepository.remove(likedPost);
  }
}
