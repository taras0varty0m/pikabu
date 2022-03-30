import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GetWithPaginateByUserIdInput } from 'src/common/get-with-paginate-by-user-id.dto';
import { CommentSort } from './comment-sort.enum';

@InputType()
export class GetCommentsInput extends PartialType(
  GetWithPaginateByUserIdInput,
) {
  @Field(() => [CommentSort], { defaultValue: [] })
  sortOptions?: CommentSort[];
}
