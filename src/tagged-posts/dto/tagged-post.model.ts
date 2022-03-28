import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class TaggedPostModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;
}
