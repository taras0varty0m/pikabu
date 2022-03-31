import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PostModel } from 'src/posts/dto/post.model';
import { UserModel } from 'src/users/dto/user.model';

@ObjectType()
export class FavoritedPostModel {
  @Field(() => ID)
  id: string;

  @Field(() => UserModel)
  user?: UserModel;

  @Field(() => PostModel)
  post?: PostModel;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  postId: string;
}
