import { Module } from '@nestjs/common';
import { LikedCommentsService } from './liked-comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedCommentsRepository } from './liked-comments.repository';
import { LikedCommentsQueriesResolver } from './resolvers/liked-comments.queries.resolver';
import { LikedCommentsMutationsResolver } from './resolvers/liked-comments.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LikedCommentsRepository])],
  providers: [
    LikedCommentsQueriesResolver,
    LikedCommentsMutationsResolver,
    LikedCommentsService,
  ],
  exports: [LikedCommentsService],
})
export class LikedCommentsModule {}
