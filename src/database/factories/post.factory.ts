import { Post } from 'src/posts/entities/post.entity';
import { define } from 'typeorm-seeding';

define(Post, (faker) => {
  const post = new Post();
  post.title = faker.random.words(1);
  post.content = faker.random.words(10);
  return post;
});
