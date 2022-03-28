import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { FavoritedComment } from './entities/favorited-comment.entity';

@EntityRepository(FavoritedComment)
export class FavoritedCommentsRepository extends Repository<FavoritedComment> {
  async getByUserIds(ids: number[]) {
    return this.createQueryBuilder('comment')
      .where('comment.userId IN (:...ids)', { ids })
      .getMany();
  }
}
