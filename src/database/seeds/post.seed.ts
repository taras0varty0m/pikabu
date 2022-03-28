import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

export default class PostSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    await factory(Post)()
      .map(async (post: Post) => {
        post.userId = user.id;
        return post;
      })
      .create();
  }
}
