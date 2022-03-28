import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserLoaders } from './users.loader';
import { UsersMutationsResolver } from './resolvers/users.mutations.resolver';
import { UsersQueriesResolver } from './resolvers/users.queries.resolver';
import { UsersFieldsResolver } from './resolvers/users.fields.resolver';
import { FavoritedPostsRepository } from 'src/favorited-posts/favorited-posts.repository';
import { FavoritedCommentsRepository } from 'src/favorited-comments/favorited-comments.repository';
import { PostsRepository } from 'src/posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      FavoritedPostsRepository,
      FavoritedCommentsRepository,
      PostsRepository,
    ]),
    AuthModule,
  ],
  providers: [
    UsersService,
    UsersMutationsResolver,
    UsersFieldsResolver,
    UsersQueriesResolver,
    UserLoaders,
  ],
  exports: [UsersService],
})
export class UsersModule {}
