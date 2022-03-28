import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';
import { TypeLike } from 'src/common/type-like.enum';

@InputType()
export class CreateLikedCommentInput {
  @Field(() => ID)
  @IsDefined()
  commentId: string;

  @Field(() => TypeLike)
  @IsEnum(TypeLike)
  type: TypeLike;
}
