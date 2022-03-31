import { PartialType, OmitType, ObjectType, Field, ID } from '@nestjs/graphql';
import { SignUpUserInput } from './sign-up.input';

@ObjectType()
export class ResponseUserDto extends PartialType(
  OmitType(SignUpUserInput, ['password']),
) {
  @Field(() => ID)
  id: string;
}
