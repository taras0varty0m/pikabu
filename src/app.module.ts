import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TaggedPostsModule } from './tagged-posts/tagged-posts.module';
import { LikedPostsModule } from './liked-posts/liked-posts.module';
import { LikedCommentsModule } from './liked-comments/liked-comments.module';
import { FavoritedCommentsModule } from './favorited-comments/favorited-comments.module';
import { FavoritedPostsModule } from './favorited-posts/favorited-posts.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './libs/NestDataloader';
import { UsersFavoritedPostDataLoader } from './users/dataloaders/users-favorited-posts.loader';
import { FavoritedPostsRepository } from './favorited-posts/favorited-posts.repository';
import { UsersFavoritedCommentDataLoader } from './users/dataloaders/users-favorited-comments.loader';
import { FavoritedCommentsRepository } from './favorited-comments/favorited-comments.repository';
import { PostsDataLoader } from './posts/dataloaders/posts.loader';
import { PostsRepository } from './posts/posts.repository';
import { PostsLikedPostDataLoader } from './posts/dataloaders/posts-liked-posts.loader';
import { LikedPostsRepository } from './liked-posts/liked-posts.repository';
import { LikedCommentsRepository } from './liked-comments/liked-comments.repository';
import { CommentsLikedCommentDataLoader } from './comments/dataloaders/comments-liked-comments.loader';
import { CommentsRepository } from './comments/comments.repository';
import { PostsCommentDataLoader } from './posts/dataloaders/posts-comments.loader';
import { CommentsDisLikesDataLoader } from './comments/dataloaders/comments-dislikes.loader';
import { CommentsLikesDataLoader } from './comments/dataloaders/comments-likes.loader';
import { PostsDisLikesDataLoader } from './posts/dataloaders/posts-dislikes.loader';
import { PostsLikesDataLoader } from './posts/dataloaders/posts-likes.loader';
import { UsersDataLoader } from './users/dataloaders/users.loader';
import { UsersRepository } from './users/users.repository';
import { UsersPostDataLoader } from './users/dataloaders/users-posts.loader';
import { CommentsDataLoader } from './comments/dataloaders/comments.loader';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        API_PORT: Joi.number().required(),
        CONNECTION: Joi.string().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-data-api'>('CONNECTION'),
        username: config.get<string>('USERNAME'),
        password: config.get<string>('PASSWORD'),
        database: config.get<string>('DATABASE'),
        port: config.get<number>('PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([
      UsersRepository,
      FavoritedPostsRepository,
      FavoritedCommentsRepository,
      PostsRepository,
      LikedPostsRepository,
      LikedCommentsRepository,
      CommentsRepository,
    ]),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    TaggedPostsModule,
    LikedPostsModule,
    LikedCommentsModule,
    FavoritedCommentsModule,
    FavoritedPostsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    {
      provide: UsersFavoritedPostDataLoader.name,
      useClass: UsersFavoritedPostDataLoader,
    },
    {
      provide: UsersFavoritedCommentDataLoader.name,
      useClass: UsersFavoritedCommentDataLoader,
    },
    {
      provide: PostsDataLoader.name,
      useClass: PostsDataLoader,
    },
    {
      provide: PostsLikedPostDataLoader.name,
      useClass: PostsLikedPostDataLoader,
    },
    {
      provide: CommentsLikedCommentDataLoader.name,
      useClass: CommentsLikedCommentDataLoader,
    },
    {
      provide: PostsCommentDataLoader.name,
      useClass: PostsCommentDataLoader,
    },
    {
      provide: CommentsDisLikesDataLoader.name,
      useClass: CommentsDisLikesDataLoader,
    },
    {
      provide: CommentsLikesDataLoader.name,
      useClass: CommentsLikesDataLoader,
    },
    {
      provide: PostsDisLikesDataLoader.name,
      useClass: PostsDisLikesDataLoader,
    },
    {
      provide: PostsLikesDataLoader.name,
      useClass: PostsLikesDataLoader,
    },
    {
      provide: UsersDataLoader.name,
      useClass: UsersDataLoader,
    },
    {
      provide: UsersPostDataLoader.name,
      useClass: UsersPostDataLoader,
    },
    {
      provide: CommentsDataLoader.name,
      useClass: CommentsDataLoader,
    },
  ],
})
export class AppModule {}
