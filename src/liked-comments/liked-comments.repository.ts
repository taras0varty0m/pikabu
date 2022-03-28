import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LikedComment } from './entities/liked-comment.entity';

@EntityRepository(LikedComment)
export class LikedCommentsRepository extends Repository<LikedComment> {
  async getByCommentIds(ids: string[]) {
    return this.createQueryBuilder('likedComment')
      .where('likedComment.commentId IN (:...ids)', { ids })
      .getMany();
  }
}
