import { TypeLike } from 'src/common/type-like.enum';
import { LikedPost } from 'src/liked-posts/entities/liked-post.entity';
import { define } from 'typeorm-seeding';

define(LikedPost, () => {
  const likedPost = new LikedPost();
  likedPost.type = TypeLike.LIKE;
  return likedPost;
});
