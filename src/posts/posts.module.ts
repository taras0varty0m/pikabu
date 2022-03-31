import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsQueriesResolver } from './resolvers/posts.queries.resolver';
import { PostsMutationsResolver } from './resolvers/posts.mutations.resolver';
import { PostsFieldsResolver } from './resolvers/posts.fields.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository])],
  providers: [
    PostsQueriesResolver,
    PostsMutationsResolver,
    PostsFieldsResolver,
    PostsService,
  ],
  exports: [PostsService],
})
export class PostsModule {}
