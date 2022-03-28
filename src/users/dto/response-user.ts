import { PartialType, OmitType, ObjectType, Field, Int } from '@nestjs/graphql';
import { SignUpUserInput } from './sign-up.input';

@ObjectType()
export class ResponseUserDto extends PartialType(
  OmitType(SignUpUserInput, ['password']),
) {
  @Field(() => Int)
  id: number;
}
