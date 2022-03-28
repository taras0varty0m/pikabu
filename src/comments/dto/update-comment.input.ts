import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => Int)
  @IsDefined()
  id: number;
}
