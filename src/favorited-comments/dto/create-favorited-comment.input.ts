import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreateFavoritedCommentInput {
  @Field(() => Int)
  @IsDefined()
  commentId: number;
}
