import { registerEnumType } from '@nestjs/graphql';

export enum TypeLike {
  LIKE = 'like',
  DISLIKE = 'dislike',
}
registerEnumType(TypeLike, {
  name: 'TypeLike',
});
