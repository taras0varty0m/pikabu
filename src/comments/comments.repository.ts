import { paginate } from 'nestjs-typeorm-paginate';
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

  getAllWithPaginationOptionsByUserId(
    getCommentWithPaginateAndFilterByUserIdInput: GetCommentsInput,
  ) {
    const {
      sortOptions,
      paginateOptions: options,
      userId,
    } = getCommentWithPaginateAndFilterByUserIdInput;

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
