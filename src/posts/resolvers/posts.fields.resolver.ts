import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostModel } from '../dto/post.model';
import { LikedPostModel } from 'src/liked-posts/dto/liked-post.model';
import { LikedPostDataLoader } from 'src/liked-posts/liked-posts.loader';
import { Loader } from 'src/libs/NestDataloader';
import { CommentModel } from 'src/comments/dto/comment.model';
import { CommentDataLoader } from 'src/comments/comments.loader';

@Resolver(() => PostModel)
export class PostsFieldsResolver {
  @ResolveField(() => [LikedPostModel])
  async likedPosts(
    @Parent() { id, likedPosts }: PostModel,
    @Loader(LikedPostDataLoader.name)
    likedPostDataLoader: ReturnType<LikedPostDataLoader['generateDataLoader']>,
  ) {
    if (likedPosts) return likedPosts;
    return await likedPostDataLoader.load(id);
  }

  @ResolveField(() => [CommentModel])
  async comments(
    @Parent() { id, comments }: PostModel,
    @Loader(CommentDataLoader.name)
    CommentDataLoader: ReturnType<CommentDataLoader['generateDataLoader']>,
  ) {
    if (comments) return comments;
    return await CommentDataLoader.load(id);
  }
}
