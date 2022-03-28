import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { TaggedPostsService } from '../tagged-posts.service';
import { CreateTaggedPostInput } from '../dto/create-tagged-post.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { EditTaggedPostsGuard } from '../edit-tagged-posts.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { TaggedPostModel } from '../dto/tagged-post.model';

@Resolver(() => TaggedPostModel)
export class TaggedPostsMutationsResolver {
  constructor(private readonly taggedPostsService: TaggedPostsService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => TaggedPostModel)
  createTaggedPost(
    @Args('createTaggedPostInput') createTaggedPostInput: CreateTaggedPostInput,
    @CurrentUser() user,
  ) {
    return this.taggedPostsService.create(createTaggedPostInput, user.id);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditTaggedPostsGuard)
  @Mutation(() => TaggedPostModel)
  removeTaggedPost(@Args('id', { type: () => Int }) id: number) {
    return this.taggedPostsService.remove(id);
  }
}
