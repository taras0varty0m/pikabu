import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TaggedPostsRepository } from './tagged-posts.repository';

@Injectable()
export class EditTaggedPostsGuard implements CanActivate {
  constructor(private taggedPostsRepository: TaggedPostsRepository) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const taggedPost = await this.taggedPostsRepository.findOne(
      ctx.getContext().req.params.id,
    );
    const userId = ctx.getContext().req.user.id;
    if (taggedPost?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
