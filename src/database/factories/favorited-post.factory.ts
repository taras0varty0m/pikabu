import { FavoritedPost } from 'src/favorited-posts/entities/favorited-post.entity';
import { define } from 'typeorm-seeding';

define(FavoritedPost, () => {
  const favoritedPost = new FavoritedPost();
  return favoritedPost;
});
