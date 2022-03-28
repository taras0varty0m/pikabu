import { SignUpUserInput } from './sign-up.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(SignUpUserInput) {
  @Field(() => Int)
  @IsDefined()
  id: number;
}
