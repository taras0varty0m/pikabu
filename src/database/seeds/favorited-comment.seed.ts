import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { FavoritedComment } from 'src/favorited-comments/entities/favorited-comment.entity';
import { Post } from 'src/posts/entities/post.entity';

export default class FavoritedCommentSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const post = await factory(Post)()
      .map(async (post: Post) => {
        post.userId = user.id;
        return post;
      })
      .create();

    const comment = await factory(Comment)()
      .map(async (comment: Comment) => {
        comment.userId = user.id;
        comment.postId = post.id;
        return comment;
      })
      .create();

    await factory(FavoritedComment)()
      .map(async (favoritedComment: FavoritedComment) => {
        favoritedComment.userId = user.id;
        favoritedComment.commentId = comment.id;
        return favoritedComment;
      })
      .create();
  }
}
