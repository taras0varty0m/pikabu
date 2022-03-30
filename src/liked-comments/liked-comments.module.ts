import { Module } from '@nestjs/common';
import { LikedCommentsService } from './liked-comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedCommentsRepository } from './liked-comments.repository';
import { LikedCommentsQueriesResolver } from './resolvers/liked-comments.queries.resolver';
import { LikedCommentsMutationsResolver } from './resolvers/liked-comments.mutations.resolver';
import { UsersRepository } from 'src/users/users.repository';
import { CommentsRepository } from 'src/comments/comments.repository';
import { LikedCommentsFieldsResolver } from './resolvers/liked-comments.fields.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikedCommentsRepository,
      UsersRepository,
      CommentsRepository,
    ]),
  ],
  providers: [
    LikedCommentsQueriesResolver,
    LikedCommentsMutationsResolver,
    LikedCommentsFieldsResolver,
    LikedCommentsService,
  ],
  exports: [LikedCommentsService],
})
export class LikedCommentsModule {}
