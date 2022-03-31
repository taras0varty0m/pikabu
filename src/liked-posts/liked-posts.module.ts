import { Module } from '@nestjs/common';
import { LikedPostsService } from './liked-posts.service';
import { LikedPostsRepository } from './liked-posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedPostsQueriesResolver } from './resolvers/liked-posts.queries.resolver';
import { LikedPostsMutationsResolver } from './resolvers/liked-posts.mutations.resolver';
import { LikedPostsFieldsResolver } from './resolvers/liked-posts.fields.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LikedPostsRepository])],
  providers: [
    LikedPostsQueriesResolver,
    LikedPostsMutationsResolver,
    LikedPostsFieldsResolver,
    LikedPostsService,
  ],
  exports: [LikedPostsService],
})
export class LikedPostsModule {}
