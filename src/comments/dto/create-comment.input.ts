import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  @IsDefined()
  postId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @Field(() => [String])
  images: string[];
}
