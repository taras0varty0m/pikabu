import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDefined, ValidateNested } from 'class-validator';
import { PaginateInput } from 'src/common/paginate.input';

@InputType()
export class GetWithPaginateByUserIdInput {
  @Field(() => PaginateInput, { defaultValue: PaginateInput })
  @ValidateNested()
  paginateOptions?: PaginateInput;

  @Field(() => ID)
  @IsDefined()
  userId: string;
}
