import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class GetFavoritedPostInput {
  @Field(() => ID)
  @IsDefined()
  id: string;
}
