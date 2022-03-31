import { TypeLike } from 'src/common/type-like.enum';
import { In, Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LikedComment } from './entities/liked-comment.entity';

@EntityRepository(LikedComment)
export class LikedCommentsRepository extends Repository<LikedComment> {
  async getByCommentIds(ids: string[]) {
    return this.createQueryBuilder('likedComment')
      .where('likedComment.commentId IN (:...ids)', { ids })
      .getMany();
  }

  getLikesByCommentIds(commentIds: string[]) {
    return this.find({
      where: { commentId: In(commentIds), type: TypeLike.LIKE },
    });
  }

  getDisLikesByCommentIds(commentIds: string[]) {
    return this.find({
      where: { commentId: In(commentIds), type: TypeLike.DISLIKE },
    });
  }
}
