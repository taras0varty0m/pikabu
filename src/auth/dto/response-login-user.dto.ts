import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/dto/user.model';

@ObjectType()
export class ResponseSignInUserDto {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  access_token: string;
}
