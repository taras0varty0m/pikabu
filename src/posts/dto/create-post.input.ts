import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @Field(() => [String], { nullable: true })
  images: string[];
}
