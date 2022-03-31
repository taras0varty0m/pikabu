import { TypeLike } from 'src/common/type-like.enum';
import { LikedComment } from 'src/liked-comments/entities/liked-comment.entity';
import { define } from 'typeorm-seeding';

define(LikedComment, () => {
  const likedComment = new LikedComment();
  likedComment.type = TypeLike.LIKE;
  return likedComment;
});
