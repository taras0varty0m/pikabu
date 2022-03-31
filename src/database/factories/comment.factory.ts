import { Comment } from 'src/comments/entities/comment.entity';
import { define } from 'typeorm-seeding';

define(Comment, (faker) => {
  const comment = new Comment();
  comment.content = faker.random.words(10);
  return comment;
});
