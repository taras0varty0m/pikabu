import { Resolver, Parent, ResolveField, Int } from '@nestjs/graphql';
import { PostModel } from '../dto/post.model';
import { LikedPostModel } from 'src/liked-posts/dto/liked-post.model';
import { LikedPostDataLoader } from 'src/liked-posts/dataloaders/liked-posts.loader';
import { Loader } from 'src/libs/NestDataloader';
import { CommentModel } from 'src/comments/dto/comment.model';
import { CommentDataLoader } from 'src/comments/dataloaders/comments.loader';
import { LikedPostsRepository } from 'src/liked-posts/liked-posts.repository';

@Resolver(() => PostModel)
export class PostsFieldsResolver {
  constructor(private readonly likedPostsRepository: LikedPostsRepository) {}

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

  @ResolveField(() => Int)
  async likes(@Parent() post: PostModel) {
    return this.likedPostsRepository.getLikesByPostId(post.id);
  }

  @ResolveField(() => Int)
  async disLikes(@Parent() post: PostModel) {
    return this.likedPostsRepository.getDisLikesByPostId(post.id);
  }
}
