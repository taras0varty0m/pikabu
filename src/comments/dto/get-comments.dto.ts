import { Field, InputType } from '@nestjs/graphql';
import { GetWithPaginateByUserIdInput } from 'src/common/get-with-paginate-by-user-id.dto';
import { CommentSort } from './comment-sort.enum';

@InputType()
export class GetCommentsInput extends GetWithPaginateByUserIdInput {
  @Field(() => [CommentSort], { defaultValue: [] })
  sortOptions?: CommentSort[];
}
