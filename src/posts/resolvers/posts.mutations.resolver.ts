import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { EditPostsGuard } from '../edit-posts.guard';
import { PostLoaders } from '../posts.loader';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { PostModel } from '../dto/post.model';

@Resolver(() => PostModel)
export class PostsMutationsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly postLoaders: PostLoaders,
  ) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => PostModel)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user,
  ) {
    return this.postsService.create(createPostInput, user.id);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditPostsGuard)
  @Mutation(() => PostModel)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditPostsGuard)
  @Mutation(() => PostModel)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}
