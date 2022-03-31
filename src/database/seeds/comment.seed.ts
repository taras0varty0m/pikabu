import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';

export default class CommentSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const post = await factory(Post)()
      .map(async (post: Post) => {
        post.userId = user.id;
        return post;
      })
      .create();

    await factory(Comment)()
      .map(async (comment: Comment) => {
        comment.userId = user.id;
        comment.postId = post.id;
        return comment;
      })
      .create();
  }
}
