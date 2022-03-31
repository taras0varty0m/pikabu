import { paginate } from 'nestjs-typeorm-paginate';
import { TypeLike } from 'src/common/type-like.enum';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { CommentSort } from './dto/comment-sort.enum';
import { GetCommentsInput } from './dto/get-comments.dto';
import { Comment } from './entities/comment.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async getByPostIds(ids: string[]) {
    return this.createQueryBuilder('comment')
      .where('comment.postId IN (:...ids)', { ids })
      .getMany();
  }

  getLikesCount(commentIds: string[]) {
    return this.createQueryBuilder('comments')
      .leftJoin('comments.likedComments', 'likedComments')
      .where('likedComments.type = :vote', { vote: TypeLike.LIKE })
      .andWhere('likedComments.commentId IN (:...ids)', { ids: commentIds })
      .loadRelationCountAndMap(
        'comments.likedCommentCount',
        'comments.likedComments',
      )
      .getMany();
  }

  getDisLikesCount(commentIds: string[]) {
    return this.createQueryBuilder('comments')
      .leftJoin('comments.likedComments', 'likedComments')
      .where('likedComments.type = :vote', { vote: TypeLike.DISLIKE })
      .andWhere('likedComments.commentId IN (:...ids)', { ids: commentIds })
      .loadRelationCountAndMap(
        'comments.disLikedCommentCount',
        'comments.likedComments',
      )
      .getMany();
  }

  getAllWithPaginationOptionsByUserId(
    getCommentWithPaginateAndFilterByUserIdInput: GetCommentsInput,
  ) {
    const {
      sortOptions,
      paginateOptions: options,
      userId,
    } = { ...getCommentWithPaginateAndFilterByUserIdInput };

    const queryBuilder = this.createQueryBuilder('comments');

    if (sortOptions) {
      sortOptions.forEach((sort) => {
        const [field, order] = this.getOrderCondition(sort);

        if (field === 'likes')
          queryBuilder
            .where('comments.userId = :id', { id: userId })
            .leftJoin('comments.likedComments', 'likedComments')
            .groupBy('comments.id')
            .orderBy(
              "COUNT(likedComments.type) FILTER (WHERE likedComments.type = 'like')",
              order,
            );
        else queryBuilder.addOrderBy(`comments.${field}`, order);
      });
    }

    return paginate<Comment>(queryBuilder, options);
  }

  private getOrderCondition(sortOption: CommentSort): OrderConditionType {
    return CommentSort[sortOption].toString().split('_') as OrderConditionType;
  }
}

type OrderConditionType = [field: string, order: 'ASC' | 'DESC'];
