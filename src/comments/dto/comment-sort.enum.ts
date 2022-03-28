import { registerEnumType } from '@nestjs/graphql';

export enum CommentSort {
  createdAt_ASC,
  createdAt_DESC,
  likes_ASC,
  likes_DESC,
}

registerEnumType(CommentSort, { name: 'CommentSort' });
