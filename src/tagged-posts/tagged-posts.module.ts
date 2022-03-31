import { Module } from '@nestjs/common';
import { TaggedPostsService } from './tagged-posts.service';
import { TaggedPostsRepository } from './tagged-posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaggedPostsQueriesResolver } from './resolvers/tagged-posts.queries.resolver';
import { TaggedPostsMutationsResolver } from './resolvers/tagged-posts.mutations.resolver';
import { TaggedPostsFieldsResolver } from './resolvers/tagged-posts.fields.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaggedPostsRepository])],
  providers: [
    TaggedPostsQueriesResolver,
    TaggedPostsMutationsResolver,
    TaggedPostsFieldsResolver,
    TaggedPostsService,
  ],
})
export class TaggedPostsModule {}
