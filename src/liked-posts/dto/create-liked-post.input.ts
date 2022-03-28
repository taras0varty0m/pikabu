import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';
import { TypeLike } from 'src/common/type-like.enum';

@InputType()
export class CreateLikedPostInput {
  @Field(() => Int)
  @IsDefined()
  postId: number;

  @Field(() => TypeLike)
  @IsEnum(TypeLike)
  type: TypeLike;
}
