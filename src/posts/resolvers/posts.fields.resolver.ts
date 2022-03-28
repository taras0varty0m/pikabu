import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostLoaders } from '../posts.loader';
import { PostModel } from '../dto/post.model';
import { CommentModel } from 'src/comments/dto/comment.model';
import { LikedPostModel } from 'src/liked-posts/dto/liked-post.model';

@Resolver(() => PostModel)
export class PostsFieldsResolver {
  constructor(private readonly postLoaders: PostLoaders) {}

  @ResolveField(() => [LikedPostModel])
  likedPosts(@Parent() { id, likedPosts }: PostModel) {
    if (likedPosts) return likedPosts;
    return this.postLoaders.batchPostLikes.load(id);
  }

  @ResolveField(() => [CommentModel])
  comments(@Parent() { id, comments }: PostModel) {
    if (comments) return comments;
    return this.postLoaders.batchComments.load(id);
  }
}
