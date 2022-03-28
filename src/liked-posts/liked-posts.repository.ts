import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LikedPost } from './entities/liked-post.entity';

@EntityRepository(LikedPost)
export class LikedPostsRepository extends Repository<LikedPost> {
  async getByPostIds(ids: number[]) {
    return this.createQueryBuilder('likedPost')
      .where('likedPost.postId IN (:...ids)', { ids })
      .getMany();
  }
}
