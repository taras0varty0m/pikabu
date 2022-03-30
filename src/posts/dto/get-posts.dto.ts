import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GetWithPaginateByUserIdInput } from 'src/common/get-with-paginate-by-user-id.dto';
import { PostFilter } from './post-filter.input';
import { PostSort } from './post-sort.enum';

@InputType()
export class GetPostsInput extends PartialType(
  OmitType(GetWithPaginateByUserIdInput, ['userId']),
) {
  @Field(() => [PostSort], { nullable: true })
  sortOptions?: PostSort[];

  @Field(() => PostFilter, { nullable: true })
  filterOptions?: PostFilter;

  @IsString()
  @Field(() => String, { nullable: true })
  search?: string;
}
