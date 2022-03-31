import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class GetCommentInput {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
