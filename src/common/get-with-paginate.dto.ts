import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { PaginateInput } from 'src/common/paginate.input';

@InputType()
export class GetWithPaginate {
  @Field(() => PaginateInput, { defaultValue: PaginateInput })
  @ValidateNested()
  paginateOptions?: PaginateInput;
}
