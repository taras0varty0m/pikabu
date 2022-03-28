import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { FavoritedPost } from 'src/favorited-posts/entities/favorited-post.entity';

export default class FavoritedPostSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const post = await factory(Post)()
      .map(async (post: Post) => {
        post.userId = user.id;
        return post;
      })
      .create();

    await factory(FavoritedPost)()
      .map(async (favoritedPost: FavoritedPost) => {
        favoritedPost.userId = user.id;
        favoritedPost.postId = post.id;
        return favoritedPost;
      })
      .create();
  }
}
