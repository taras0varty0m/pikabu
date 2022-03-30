import { Module } from '@nestjs/common';
import { FavoritedPostsService } from './favorited-posts.service';
import { FavoritedPostsRepository } from './favorited-posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritedPostsQueriesResolver } from './resolvers/favorited-posts.queries.resolver';
import { FavoritedPostsMutationsResolver } from './resolvers/favorited-posts.mutations.resolver';
import { FavoritedPostsFieldsResolver } from './resolvers/favorited-posts.fields.resolver';
import { UsersRepository } from 'src/users/users.repository';
import { PostsRepository } from 'src/posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritedPostsRepository,
      UsersRepository,
      PostsRepository,
    ]),
  ],
  providers: [
    FavoritedPostsQueriesResolver,
    FavoritedPostsMutationsResolver,
    FavoritedPostsFieldsResolver,
    FavoritedPostsService,
  ],
  exports: [FavoritedPostsService],
})
export class FavoritedPostsModule {}
