import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  @IsDefined()
  postId: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @Field(() => [String])
  images: string[];
}
