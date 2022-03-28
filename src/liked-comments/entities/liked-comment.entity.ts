import { Comment } from 'src/comments/entities/comment.entity';
import { TypeLike } from 'src/common/type-like.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LikedComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user?: User;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: TypeLike,
  })
  type: TypeLike;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Comment, (comment) => comment.likedComments, {
    onDelete: 'CASCADE',
  })
  comment?: Comment;

  @Column()
  commentId: number;
}
