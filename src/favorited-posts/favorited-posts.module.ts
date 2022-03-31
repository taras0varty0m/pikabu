import { Module } from '@nestjs/common';
import { FavoritedPostsService } from './favorited-posts.service';
import { FavoritedPostsRepository } from './favorited-posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritedPostsQueriesResolver } from './resolvers/favorited-posts.queries.resolver';
import { FavoritedPostsMutationsResolver } from './resolvers/favorited-posts.mutations.resolver';
import { FavoritedPostsFieldsResolver } from './resolvers/favorited-posts.fields.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritedPostsRepository])],
  providers: [
    FavoritedPostsQueriesResolver,
    FavoritedPostsMutationsResolver,
    FavoritedPostsFieldsResolver,
    FavoritedPostsService,
  ],
  exports: [FavoritedPostsService],
})
export class FavoritedPostsModule {}
