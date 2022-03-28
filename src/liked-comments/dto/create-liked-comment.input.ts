import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';
import { TypeLike } from 'src/common/type-like.enum';

@InputType()
export class CreateLikedCommentInput {
  @Field(() => Int)
  @IsDefined()
  commentId: number;

  @Field(() => TypeLike)
  @IsEnum(TypeLike)
  type: TypeLike;
}
