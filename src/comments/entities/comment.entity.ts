import { FavoritedComment } from 'src/favorited-comments/entities/favorited-comment.entity';
import { LikedComment } from 'src/liked-comments/entities/liked-comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post?: Post;

  @Column()
  postId: string;

  @Column('text', { array: true, default: [] })
  images: string[];

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user?: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => LikedComment, (likedComment) => likedComment.comment, {
    cascade: true,
  })
  likedComments?: LikedComment[];

  @OneToMany(
    () => FavoritedComment,
    (favoritedComment) => favoritedComment.comment,
    {
      cascade: true,
    },
  )
  favoritedComments?: FavoritedComment[];
}
