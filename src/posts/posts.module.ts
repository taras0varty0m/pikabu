import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLoaders } from './posts.loader';
import { PostsQueriesResolver } from './resolvers/posts.queries.resolver';
import { PostsMutationsResolver } from './resolvers/posts.mutations.resolver';
import { PostsFieldsResolver } from './resolvers/posts.fields.resolver';
import { LikedPostsRepository } from 'src/liked-posts/liked-posts.repository';
import { CommentsRepository } from 'src/comments/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsRepository,
      LikedPostsRepository,
      CommentsRepository,
    ]),
  ],
  providers: [
    PostsQueriesResolver,
    PostsMutationsResolver,
    PostsFieldsResolver,
    PostsService,
    PostLoaders,
  ],
  exports: [PostsService],
})
export class PostsModule {}
