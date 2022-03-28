import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class FavoritedComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user?: User;

  @Column()
  userId: string;

  @ManyToOne(() => Comment, (comment) => comment.favoritedComments, {
    onDelete: 'CASCADE',
  })
  comment?: Comment;

  @Column()
  commentId: string;
}
