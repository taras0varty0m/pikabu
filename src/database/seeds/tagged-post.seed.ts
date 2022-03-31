import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { TaggedPost } from 'src/tagged-posts/entities/tagged-post.entity';

export default class TaggedPostSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const post = await factory(Post)()
      .map(async (post: Post) => {
        post.userId = user.id;
        return post;
      })
      .create();

    await factory(TaggedPost)()
      .map(async (taggedPost: TaggedPost) => {
        taggedPost.userId = user.id;
        taggedPost.postId = post.id;
        return taggedPost;
      })
      .create();
  }
}
