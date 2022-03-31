import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class TaggedPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user?: User;

  @Column()
  userId: string;

  @ManyToOne(() => Post, (post) => post.taggedPosts, { onDelete: 'CASCADE' })
  post?: Post;

  @Column()
  postId: string;
}
