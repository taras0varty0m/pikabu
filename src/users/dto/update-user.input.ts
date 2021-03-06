import { SignUpUserInput } from './sign-up.input';
import { Field, InputType, ID, PartialType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(SignUpUserInput) {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
