import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class CreateFavoritedCommentInput {
  @Field(() => ID)
  @IsDefined()
  commentId: string;
}
