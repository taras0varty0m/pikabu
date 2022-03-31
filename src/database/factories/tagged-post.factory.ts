import { TaggedPost } from 'src/tagged-posts/entities/tagged-post.entity';
import { define } from 'typeorm-seeding';

define(TaggedPost, (faker) => {
  const taggedPost = new TaggedPost();
  taggedPost.title = faker.random.words(1);
  return taggedPost;
});
