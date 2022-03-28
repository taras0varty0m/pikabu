import { ObjectType, Field, ID } from '@nestjs/graphql';
@ObjectType()
export class TaggedPostModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  postId: string;
}
