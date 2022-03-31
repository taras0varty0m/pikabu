import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsQueriesResolver } from './resolvers/comments.queries.resolver';
import { CommentsMutationsResolver } from './resolvers/comments.mutations.resolver';
import { CommentsFieldsResolver } from './resolvers/comments.fields.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
  providers: [
    CommentsQueriesResolver,
    CommentsMutationsResolver,
    CommentsFieldsResolver,
    CommentsService,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
