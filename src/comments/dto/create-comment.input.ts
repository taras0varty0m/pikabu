import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDefined, MaxLength } from 'class-validator';

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

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsDefined({ each: true })
  @MaxLength(50, { each: true })
  @Field(() => [String], { defaultValue: [] })
  images?: string[];
}
