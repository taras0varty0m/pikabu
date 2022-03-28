import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { TypeLike } from 'src/common/type-like.enum';

@Entity()
export class LikedPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user?: User;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: TypeLike,
  })
  type: TypeLike;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.likedPosts, { onDelete: 'CASCADE' })
  post?: Post;

  @Column()
  postId: string;
}
