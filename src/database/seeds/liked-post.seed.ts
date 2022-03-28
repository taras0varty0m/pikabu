import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { LikedPost } from 'src/liked-posts/entities/liked-post.entity';

export default class LikedPostSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const post = await factory(Post)()
      .map(async (post: Post) => {
        post.userId = user.id;
        return post;
      })
      .create();

    await factory(LikedPost)()
      .map(async (likedPost: LikedPost) => {
        likedPost.userId = user.id;
        likedPost.postId = post.id;
        return likedPost;
      })
      .create();
  }
}
