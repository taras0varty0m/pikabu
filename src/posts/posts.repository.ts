import { paginate } from 'nestjs-typeorm-paginate';
import { TypeLike } from 'src/common/type-like.enum';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { GetPostsInput } from './dto/get-posts.dto';
import { PostGroup } from './dto/post-filter.input';
import { PostSort } from './dto/post-sort.enum';
import { Post } from './entities/post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getByUserIds(ids: string[]) {
    return this.createQueryBuilder('post')
      .where('post.userId IN (:...ids)', { ids })
      .getMany();
  }

  getVoteCount(postIds: string[], type: TypeLike) {
    return this.createQueryBuilder('posts')
      .leftJoin('posts.likedPosts', 'likedPosts')
      .where('likedPosts.type = :vote', { vote: type })
      .andWhere('likedPosts.postId IN (:...ids)', { ids: postIds })
      .loadRelationCountAndMap('posts.likedPostCount', 'posts.likedPosts')
      .getMany();
  }

  getAllWithPaginationOptions(getPostsInput?: GetPostsInput) {
    const {
      sortOptions,
      paginateOptions: options,
      search,
      filterOptions: postFiler,
    } = { ...getPostsInput };

    const queryBuilder = this.createQueryBuilder('posts').leftJoin(
      'posts.taggedPosts',
      'tags',
    );

    if (search) queryBuilder.where('posts.title = :title', { title: search });

    if (sortOptions) {
      sortOptions.forEach((sort) => {
        const [field, order] = this.getOrderCondition(sort);

        if (field === 'likes')
          queryBuilder
            .leftJoin('posts.likedPosts', 'likedPosts')
            .groupBy('posts.id')
            .orderBy(
              "COUNT(likedPosts.type) FILTER (WHERE likedPosts.type = 'like')",
              order,
            );
        else queryBuilder.addOrderBy(`posts.${field}`, order);
      });
    }

    if (postFiler?.tags) {
      queryBuilder.andWhere('tags.title IN (:...titles)', {
        titles: postFiler.tags,
      });
    }

    switch (postFiler?.group) {
      case PostGroup.BEST:
        queryBuilder
          .where(`posts.createdAt >= NOW() - '1 day'::INTERVAL`)
          .leftJoin('posts.likedPosts', 'likedPosts')
          .groupBy('posts.id')
          .orderBy(
            "COUNT(likedPosts.type) FILTER (WHERE likedPosts.type = 'like')",
            'DESC',
          );
        break;
      case PostGroup.HOT:
        queryBuilder
          .where(`posts.createdAt >= NOW() - '1 day'::INTERVAL`)
          .leftJoin('posts.comments', 'comments')
          .groupBy('posts.id')
          .orderBy('COUNT(comments.id)', 'DESC');
        break;
      case PostGroup.RECENT:
        queryBuilder.where(
          `posts.createdAt > current_timestamp - interval '1 day'`,
        );
        break;
      default:
        break;
    }

    return paginate<Post>(queryBuilder, options);
  }

  private getOrderCondition(sortOption: PostSort): OrderConditionType {
    return PostSort[sortOption].toString().split('_') as OrderConditionType;
  }
}

type OrderConditionType = [field: string, order: 'ASC' | 'DESC'];
