import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Exclude } from 'class-transformer';
import { FavoritedPost } from 'src/favorited-posts/entities/favorited-post.entity';
import { FavoritedComment } from 'src/favorited-comments/entities/favorited-comment.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments?: Comment[];

  @OneToMany(() => FavoritedPost, (favoritedPost) => favoritedPost.user, {
    cascade: true,
  })
  favoritedPosts?: FavoritedPost[];

  @OneToMany(
    () => FavoritedComment,
    (favoritedComment) => favoritedComment.user,
    {
      cascade: true,
    },
  )
  favoritedComments?: FavoritedComment[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
