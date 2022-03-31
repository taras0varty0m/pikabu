import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { LikedComment } from 'src/liked-comments/entities/liked-comment.entity';
import { Post } from 'src/posts/entities/post.entity';

export default class LikedCommentSeed implements Seeder {
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

    await factory(LikedComment)()
      .map(async (likedComment: LikedComment) => {
        likedComment.userId = user.id;
        likedComment.commentId = comment.id;
        return likedComment;
      })
      .create();
  }
}
