import { TypeLike } from 'src/common/type-like.enum';
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

  getLikesByCommentId(commentId: string) {
    return this.count({ where: { commentId, type: TypeLike.LIKE } });
  }

  getDisLikesByCommentId(commentId: string) {
    return this.count({ where: { commentId, type: TypeLike.DISLIKE } });
  }
}
