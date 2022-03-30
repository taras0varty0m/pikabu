import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { GetWithPaginate } from 'src/common/get-with-paginate.dto';
import { PostFilter } from './post-filter.input';
import { PostSort } from './post-sort.enum';

@InputType()
export class GetPostsInput extends GetWithPaginate {
  @Field(() => [PostSort], { nullable: true })
  sortOptions?: PostSort[];

  @Field(() => PostFilter, { defaultValue: PostFilter })
  @ValidateNested()
  filterOptions?: PostFilter;

  @Field(() => String, { nullable: true })
  search?: string;
}
