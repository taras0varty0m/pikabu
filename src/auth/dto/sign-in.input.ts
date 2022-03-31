import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class SignInUserInput {
  @Field(() => String, { description: 'Email of the user' })
  @IsDefined()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Password of the user' })
  @IsString()
  @IsDefined()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
