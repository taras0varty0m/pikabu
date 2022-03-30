import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { EditPostsGuard } from '../edit-posts.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { PostModel } from '../dto/post.model';
import { GetPostInput } from '../dto/get-post.dto';

@Resolver(() => PostModel)
export class PostsMutationsResolver {
  constructor(private readonly postsService: PostsService) {}

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
  removePost(
    @Args('getPostInput')
    getPostInput: GetPostInput,
  ) {
    return this.postsService.remove(getPostInput);
  }
}
