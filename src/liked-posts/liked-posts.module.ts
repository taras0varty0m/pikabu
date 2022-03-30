import { Module } from '@nestjs/common';
import { LikedPostsService } from './liked-posts.service';
import { LikedPostsRepository } from './liked-posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedPostsQueriesResolver } from './resolvers/liked-posts.queries.resolver';
import { LikedPostsMutationsResolver } from './resolvers/liked-posts.mutations.resolver';
import { LikedPostsFieldsResolver } from './resolvers/liked-posts.fields.resolver';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikedPostsRepository,
      PostsRepository,
      UsersRepository,
    ]),
  ],
  providers: [
    LikedPostsQueriesResolver,
    LikedPostsMutationsResolver,
    LikedPostsFieldsResolver,
    LikedPostsService,
  ],
  exports: [LikedPostsService],
})
export class LikedPostsModule {}
