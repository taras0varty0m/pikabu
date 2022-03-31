import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class AddCommentToFavoritesInput {
  @Field(() => ID)
  @IsDefined()
  commentId: string;
}
