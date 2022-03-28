import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
