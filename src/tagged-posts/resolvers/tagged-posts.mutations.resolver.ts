import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TaggedPostsService } from '../tagged-posts.service';
import { CreateTaggedPostInput } from '../dto/create-tagged-post.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { EditTaggedPostsGuard } from '../edit-tagged-posts.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { TaggedPostModel } from '../dto/tagged-post.model';
import { GetTaggedPostInput } from '../dto/get-tagged-post.dto';

@Resolver(() => TaggedPostModel)
export class TaggedPostsMutationsResolver {
  constructor(private readonly taggedPostsService: TaggedPostsService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => TaggedPostModel)
  addPostToTagged(
    @Args('addPostToTaggedInput') createTaggedPostInput: CreateTaggedPostInput,
    @CurrentUser() user,
  ) {
    return this.taggedPostsService.create(createTaggedPostInput, user.id);
  }

  @UseGuards(GraphqlJwtAuthGuard, EditTaggedPostsGuard)
  @Mutation(() => TaggedPostModel)
  removePostFromTagged(
    @Args('getTaggedPostInput')
    getTaggedPostInput: GetTaggedPostInput,
  ) {
    return this.taggedPostsService.remove(getTaggedPostInput);
  }
}
