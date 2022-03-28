import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';
import { TypeLike } from 'src/common/type-like.enum';

@InputType()
export class CreateLikedPostInput {
  @Field(() => ID)
  @IsDefined()
  postId: string;

  @Field(() => TypeLike)
  @IsEnum(TypeLike)
  type: TypeLike;
}
