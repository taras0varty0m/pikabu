import { Comment } from 'src/comments/entities/comment.entity';
import { FavoritedPost } from 'src/favorited-posts/entities/favorited-post.entity';
import { LikedPost } from 'src/liked-posts/entities/liked-post.entity';
import { TaggedPost } from 'src/tagged-posts/entities/tagged-post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user?: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments?: Comment[];

  @Column('text', { array: true, default: [] })
  images?: string[];

  @OneToMany(() => TaggedPost, (taggedPost) => taggedPost.post, {
    cascade: true,
  })
  taggedPosts?: TaggedPost[];

  @OneToMany(() => LikedPost, (likedPost) => likedPost.post, {
    cascade: true,
  })
  likedPosts?: LikedPost[];

  @OneToMany(() => FavoritedPost, (favoritedPost) => favoritedPost.post, {
    cascade: true,
  })
  favoritedPosts?: FavoritedPost[];
}
