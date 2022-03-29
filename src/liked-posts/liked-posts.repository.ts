import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LikedPost } from './entities/liked-post.entity';
import { TypeLike } from 'src/common/type-like.enum';

@EntityRepository(LikedPost)
export class LikedPostsRepository extends Repository<LikedPost> {
  async getByPostIds(ids: string[]) {
    return this.createQueryBuilder('likedPost')
      .where('likedPost.postId IN (:...ids)', { ids })
      .getMany();
  }

  getLikesByPostId(postId: string) {
    return this.count({ where: { postId, type: TypeLike.LIKE } });
  }

  getDisLikesByPostId(postId: string) {
    return this.count({ where: { postId, type: TypeLike.DISLIKE } });
  }
}
