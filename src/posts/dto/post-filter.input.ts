import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';

export enum PostGroup {
  RECENT,
  HOT,
  BEST,
}
@InputType()
export class PostFilter {
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  tags: string[];

  @Field(() => PostGroup, { nullable: true })
  @IsEnum(PostGroup)
  group: PostGroup;
}

registerEnumType(PostGroup, { name: 'PostGroup' });
