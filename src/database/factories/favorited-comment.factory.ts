import { FavoritedComment } from 'src/favorited-comments/entities/favorited-comment.entity';
import { define } from 'typeorm-seeding';

define(FavoritedComment, () => {
  const favoritedComment = new FavoritedComment();
  return favoritedComment;
});
