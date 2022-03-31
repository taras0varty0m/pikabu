import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class SignUpUserInput {
  @Field(() => String, { description: 'Email of the user' })
  @IsDefined()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Password of the user' })
  @IsString()
  @IsDefined()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  password: string;
}
