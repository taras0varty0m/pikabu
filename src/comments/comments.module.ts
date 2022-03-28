import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLoaders } from './comments.loader';
import { CommentsQueriesResolver } from './resolvers/comments.queries.resolver';
import { CommentsMutationsResolver } from './resolvers/comments.mutations.resolver';
import { CommentsFieldsResolver } from './resolvers/comments.fields.resolver';
import { LikedCommentsRepository } from 'src/liked-comments/liked-comments.repository';
import { FavoritedCommentsRepository } from 'src/favorited-comments/favorited-comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsRepository,
      LikedCommentsRepository,
      FavoritedCommentsRepository,
    ]),
  ],
  providers: [
    CommentsQueriesResolver,
    CommentsMutationsResolver,
    CommentsFieldsResolver,
    CommentsService,
    CommentLoaders,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
