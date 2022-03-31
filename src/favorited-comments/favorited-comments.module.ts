import { Module } from '@nestjs/common';
import { FavoritedCommentsService } from './favorited-comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritedCommentsRepository } from './favorited-comments.repository';
import { FavoritedCommentsQueriesResolver } from './resolvers/favorited-comments.queries.resolver';
import { FavoritedCommentsMutationsResolver } from './resolvers/favorited-comments.mutations.resolver';
import { FavoritedCommentsFieldsResolver } from './resolvers/favorited-comments.fields.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritedCommentsRepository])],
  providers: [
    FavoritedCommentsQueriesResolver,
    FavoritedCommentsMutationsResolver,
    FavoritedCommentsFieldsResolver,
    FavoritedCommentsService,
  ],
  exports: [FavoritedCommentsService],
})
export class FavoritedCommentsModule {}
