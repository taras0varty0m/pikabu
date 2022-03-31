import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class GetLikedCommentInput {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
