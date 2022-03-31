import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TypeLike } from 'src/common/type-like.enum';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';

@ObjectType()
export class LikedPostModel {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => UserModel)
  user?: UserModel;

  @Field(() => PostModel)
  post?: PostModel;

  @Field(() => TypeLike)
  type: TypeLike;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => ID)
  postId: string;
}
