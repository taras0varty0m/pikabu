import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { GetWithPaginate } from './get-with-paginate.dto';

@InputType()
export class GetWithPaginateByUserIdInput extends GetWithPaginate {
  @Field(() => ID)
  @IsDefined()
  userId: string;
}
