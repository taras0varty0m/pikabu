import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

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

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsDefined({ each: true })
  @MaxLength(50, { each: true })
  @Field(() => [String], { defaultValue: [] })
  images?: string[];
}
