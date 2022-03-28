import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
