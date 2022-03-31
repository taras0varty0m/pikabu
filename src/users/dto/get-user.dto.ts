import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class GetUserInput {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
