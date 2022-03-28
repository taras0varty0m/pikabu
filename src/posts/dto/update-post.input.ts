import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  @IsDefined()
  id: number;
}
