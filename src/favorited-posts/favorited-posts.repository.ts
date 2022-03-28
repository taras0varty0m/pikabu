import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { FavoritedPost } from './entities/favorited-post.entity';

@EntityRepository(FavoritedPost)
export class FavoritedPostsRepository extends Repository<FavoritedPost> {
  async getByUserIds(ids: string[]) {
    return this.createQueryBuilder('post')
      .where('post.userId IN (:...ids)', { ids })
      .getMany();
  }
}
